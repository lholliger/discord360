import * as get from './src/get.js'
import * as stor from './src/stor.js'
import * as file from './src/file.js'
import * as discord from './src/discord.js'
import log from './src/log.js'
import 'dotenv/config'
import fs from 'fs'

let circle;

async function initialize() {
    await file.initialize()

        // verify login working
        let circles = await get.get("https://www.life360.com/v3/circles")
        let allow = false
        for (let c of circles.circles) {
            if (c.id == process.env.CIRCLE) {
                log("JOIN", `Found circle "${c.name}" with ${c.memberCount} members!`)
                allow = true
                circle = c
            }
        }
        if (!allow) {
            log("JOIN", `Could not found group id ${process.env.CIRCLE}`, 3)
            process.exit(1)
        }

        stor.initialize(circle)

    await discord.initialize()
}


initialize()