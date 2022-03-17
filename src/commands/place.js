import * as stor from '../stor.js'
import embed from "../embed.js"

let phrases = ["Hopefully you can get out more later...", "Hopefully you aren't alone...", "Any plans?", "At least you aren't using gas..."]
export default async function main(msg, token, client) {

    let users = []

    for (let [user, data] of Object.entries(stor.circle.data.userHistory)) {
        let date = new Date(Number(data.since)*1000)

        // millisecondsuntil.com
        let diffOrig = new Date()/1-date/1
        let diff = diffOrig
        let year = Math.floor(diff/(1000*60*60*24*365))
        diff -= year*1000*60*60*24*365
        let days = Math.floor(diff/(1000*60*60*24))
        diff -= days*1000*60*60*24
        let hours = Math.floor(diff/(1000*60*60))
        diff -= hours*1000*60*60
        let minutes = Math.floor(diff/(1000*60))
        diff -= minutes*1000*60
        let seconds = Math.floor(diff/1000)
        diff -= seconds*1000
        let formatTime = `${diffOrig > 1000*60*60*24 ? `${days} day${days != 1 ? "s,": ","}` : ""} ${diffOrig > 1000*60*60 ? `${hours} hour${hours != 1 ? "s,": ","}` : ""} ${diffOrig > 1000*60 ? `${minutes} minute${minutes != 1 ? "s": ""}` : ""}`
        
        
        users.push({
            name: stor.circle.data.userData[user].name,
            sort: Number(data.since),
            value: `${formatTime} (${date.toLocaleString()})`
        })
    }

    users = users.sort((a ,b) => a.sort - b.sort)

    return {"reaction": "☑", "out": embed("At the Same Location for Longest", phrases[Math.floor(Math.random() * phrases.length)], users)}
}