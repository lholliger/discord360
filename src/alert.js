import {client} from './discord.js'
import Discord from "discord.js";
import log from "./log.js";
import {circle} from "./stor.js";

export function runUpdateReport() {
    for (let user in circle.data.userHistory) {
        if (Number(circle.data.userHistory[user].battery) <= 10 && Number(circle.data.userHistory[user].charge) != 1 && circle.needAlert(user, "charge")) {
            circle.setAlert(user, "charge", true)
            let defOut = new Discord.MessageEmbed()
                .setColor("#9463FB")
                .setTitle("Battery Low")
                .setDescription(`${circle.data.userData[user].name}'s battery is at ${Number(circle.data.userHistory[user].battery).toFixed(2)}%!`)

            if (circle.data.userData[user].avatar) defOut.setImage(circle.data.userData[user].avatar)

            client.channels.cache.get(process.env.UPDATES).send({"embeds": [defOut]})
        } else {
            circle.setAlert(user, "charge", false)
        }
    }
}