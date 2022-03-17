import Discord from "discord.js";
import fs from 'fs'

export default async function main(msg, token, client) {

    let commands = JSON.parse(await fs.promises.readFile("commands.json"))

    let cmdList = []
    for (let command of commands) {
        cmdList.push({
            name: `\`${command.name}\``,
            value: command.description
        })
    }

    let defOut = new Discord.MessageEmbed()
        .setColor("#9463FB")
        .setTitle("Help")
        .setDescription("How to use the Life360 bot")
    defOut.addFields(...cmdList)
    return {"reaction": "☑", "out": defOut}
}