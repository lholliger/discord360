import fs from 'fs'
import log from './log.js'

export function readJSON(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, async (err) => {
            if (err) {
                log("STORE", `Failed read on ${path}`, 2)
                resolve()
            } else {
                log("STORE", `Successful read on ${path}`, 0)
                resolve(JSON.parse(await fs.promises.readFile(path, "utf8")))
            }
        })
    })
}


export function writeJSON(path, data) {
    return new Promise(async (resolve, reject) => {
        fs.access(path, fs.F_OK, async (err) => {
            fs.writeFile(path, JSON.stringify(data), (err) => {
                if (err) {
                    log("STORE", `Failed write on ${path}`, 3)
                    reject(err)
                } else {
                    log("STORE", `Successful write on ${path}`, 0)
                    resolve(err)
                }
            });
        });
    });
}

export async function initialize() {
    try {
        fs.mkdir("data/backups", {recursive:true},(err) => {})
    } catch(err) {
        console.log(err);
    }
    log("STORE", `Initialized`, 0)
}