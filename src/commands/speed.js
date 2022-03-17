import * as stor from '../stor.js'
import embed from "../embed.js"

let phrases = ["Hopefully you drove the speed limit...", "What did the sign say again?", "Totally legal speeds, right?", "Couldn't read the signs, I guess"]
export default async function main(msg, token, client) {

    let users = []

    for (let [user, data] of Object.entries(stor.circle.data.userReport)) {
        users.push({
            name: stor.circle.data.userData[user].name,
            sort: Number(data.topSpeed)*2.237,
            value: `${(Number(data.topSpeed)*2.237).toFixed(2)} MPH` // is measured in meters/second
        })
    }

    users = users.sort((a ,b) => b.sort - a.sort)

    return {"reaction": "☑", "out": embed("This Week's Top Speeders", phrases[Math.floor(Math.random() * phrases.length)], users)}
}