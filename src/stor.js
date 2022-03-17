import * as get from './get.js'
import log from './log.js'
import * as file from "./file.js"
import * as alert from './alert.js'
export let circle = {}
let datapath;
let data = {}

async function run() {
    //let report = await get.get(`https://api-cloudfront.life360.com/v3/drivereport/circle/${circle.data.srv.id}/stats`)

    let hist = await get.get(`https://api-cloudfront.life360.com/v3/circles/${circle.data.srv.id}/members/history`)
    for (let member of hist.locations) {
        circle.setUserHistory(member.userId, member)
        let userReport = await get.get(`https://api-cloudfront.life360.com/v3/drivereport/circle/${circle.data.srv.id}/user/${member.userId}/stats?weekOffset=0`)
        circle.setUserReport(userReport.user.user_id, userReport.week)
    }


    alert.runUpdateReport()

    setTimeout(run, 1000*60*10)
}


function save() {
    file.writeJSON(datapath, circle)
}

class Circle {
    constructor(c, l360) {
        if (!c) {
            log("STOR", `Circle not initialized! Creating!`, 2)
            this.data = {
                userReport: {},
                userData: {},
                userHistory: {},
                userAlerts: {}
            }
            this.data.srv = l360
        } else {
            log("STOR", `Imported circle`, 0)
            this.data = c.data
        }

        save()
    }

    setUserReport(id, report) {
        log("STOR", `Updated driving report for ${id}`)
        this.data.userReport[id] = report
        save()
    }

    setUserHistory(id, hist) {
        log("STOR", `Updated history for ${id}`)
        this.data.userHistory[id] = hist
        save()
    }

    setUserData(id, data) {
        log("STOR", `Updated user data for ${id} (${data.firstName}`)
        this.data.userData[id] = {
            name: data.firstName,
            avatar: data.avatar,
            join: new Date(Number(data.createdAt)*1000)
        }
        save()
    }

    needAlert(id, alert) {
        if (this.data.userAlerts[id]) {
            return !this.data.userAlerts[id][alert]
        } else return true
    }

    setAlert(id, alert, val) {
        if (!this.data.userAlerts[id]) this.data.userAlerts[id] = {}
        this.data.userAlerts[id][alert] = val
        save()
    }

}

export async function initialize(c) {
    log("STOR", `Initializing with ${c.id}`)

    datapath = `data/${c.id}.json`

    data = await file.readJSON(datapath)

    circle = new Circle(data, c)

    log("STOR", "Imported data")


    log("STOR", "Loading member list")
    let members = await get.get(`https://api-cloudfront.life360.com/v3/circles/${circle.data.srv.id}/members`)
    for (let member of members.members) circle.setUserData(member.id, member)

    run()
}