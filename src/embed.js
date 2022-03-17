import Discord from "discord.js";


export default function generate(title, description, users) {
    let places = {
        1: "🥇",
        2: "🥈",
        3: "🥉"
    }
    let out = []
    for (let user in users) {
        let place = Number(user)+1
        out.push({
            "name": `**${places[place] || `#${place}:`}** ${users[user].name}`,
            "value": users[user].value
        })
    }

    let defOut = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor("#9463FB")
    defOut.addFields(...out)
    return defOut
}