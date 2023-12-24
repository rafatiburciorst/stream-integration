import { createReadStream } from 'node:fs'
import http from 'node:http'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = http.createServer((req, res) => {

    //cors
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET', 'POST', 'PUT', 'DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')


    if (req.url === '/start') {
        const data = createReadStream(resolve(__dirname, 'file.json'))
        data.pipe(res)
    }
})

server.listen(3000)