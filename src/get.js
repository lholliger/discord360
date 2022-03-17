import fetch from 'node-fetch'
import 'dotenv/config'


const AUTHORIZATION = process.env.AUTHORIZATION
export async function get(url) {
    return new Promise(async (resolve, reject) => {
        let data = await fetch(url, {
            headers: {
                "Authorization": AUTHORIZATION,
                "Accept": "application/json"
            }
        })

        resolve(await data.json())
    })
}