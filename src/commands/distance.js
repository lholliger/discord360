import * as stor from '../stor.js'
import embed from "../embed.js"

let phrases = ["Gas is expensive, you know?", "Busy busy busy...", "I hope you brought friends with you!", "Long work commute?"]
export default async function main(msg, token, client) {

    let users = []

    for (let [user, data] of Object.entries(stor.circle.data.userReport)) {
        users.push({
            name: stor.circle.data.userData[user].name,
            sort: Number(data.distance)/1609,
            value: `${(Number(data.distance)/1609).toFixed(2)} miles` // is measured in meters
        })
    }

    users = users.sort((a ,b) => b.sort - a.sort)

    return {"reaction": "☑", "out": embed("This Week's Longest Drivers", phrases[Math.floor(Math.random() * phrases.length)], users)}
}