import dotenv from 'dotenv'
dotenv.config()

const LOGLEVEL = parseInt(process.env.LOGLEVEL || 1)

const typeMap = {
    0: "VERBOSE",
    1: null,
    2: "WARN",
    3: "FATAL"
}

export default function log(src, info, type) {
    if (type == null) type = 1
    if (type < LOGLEVEL) return
    if (type != 1) console.log(`[${new Date().toISOString()}] [${typeMap[type]}] [${src}] ${info}`)
    else console.log(`[${new Date().toISOString()}] [${src}] ${info}`)
}