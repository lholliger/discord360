import { Client, Intents } from 'discord.js'
import fs from "fs";
import log from "./log.js";
export let client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,] });

let commands = {}

let me;



export async function initialize() {
    const commandList = JSON.parse(fs.readFileSync("commands.json"))

    for (let command of commandList) {
        commands[command.name] = command
        commands[command.name].exec = (await import(`./commands/${command.path}.js`)).default

        log("MAIN", `Mapped command ${command.name.toUpperCase()} to ${command.path}.js`)
    }

    client.login(process.env.TOKEN);

    client.on('ready', async () => {
        log("DISC", `Logged in as ${client.user.tag}`);
        me = client.user.id
    });

    client.on('messageCreate', async msg => handleMessage(msg))
}



let sendCache = {}

function isCommand(msg) {
    let isRepliedTo = false
    if (msg.mentions.repliedUser) if (msg.mentions.repliedUser.id == me) isRepliedTo = true

    return msg.content.includes(`<@!${me}>`) || msg.content.includes(`<@${me}>`) || isRepliedTo
}

client.on("messageUpdate", async (oldMsg, newMsg) => {
    if (oldMsg.content != newMsg.content) {
        if (isCommand(newMsg)) {
            if (sendCache[newMsg.id]) {
                (await newMsg.channel.messages.fetch(sendCache[newMsg.id])).delete()
            }
            handleMessage(newMsg)
        }
    }
})

async function handleMessage(msg) { // clean this up!
    if (msg.content.startsWith(".")) return
    if (isCommand(msg)) {
        let token = msg.content.split(`<@!${me}>`).join("").split(`<@${me}>`).join("").replace(/ +(?= )/g,'').trim().split(" ")
        log("DISC", `${msg.author.tag} execute [${token.join(", ")}]`);

        if (commands[token[0]]) {
            let command = commands[token[0]]
            if (token.length - 1 < command.args) {
                msg.channel.send(`Sorry, this message needs ${command.args} ${command.args == 1 ? "argument" : "arguments"}`)
                return
            } else {
                try {
                    msg.channel.sendTyping();
                    let res = await command.exec(msg, token, client)
                    let opts = {}
                    let reply = true
                    if (res.mention == false) opts.allowedMentions = {repliedUser: false}
                    if (res.reply == false) reply = false
                    if (typeof res.out == "object") {
                        reply ? msg.reply({"embeds": [res.out], ...opts}) : msg.channel.send({"embeds": [res.out], ...opts})
                    } else if (res.out && res.out != "") {
                        reply ? msg.reply({"content": res.out, ...opts}) : msg.channel.send({"content": res.out, ...opts})
                    }
                    if (res.reaction) msg.react(res.reaction);
                } catch (e) {
                    log("MAIN", e, 2)
                }
            }
        }
    }
}
