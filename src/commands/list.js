import * as stor from '../stor.js'
import Discord from "discord.js";

export default async function main(msg, token, client) {

    let users = []

    for (let user in stor.circle.data.userData) {
        users.push({
            name: stor.circle.data.userData[user].name,
            value: `Joined ${stor.circle.data.userData[user].join.toLocaleString('en-US')}`
        })
    }

    let defOut = new Discord.MessageEmbed()
        .setColor("#9463FB")
    defOut.addFields(...users)
    return {"reaction": "☑", "out": defOut}
}