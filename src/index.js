import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))


const readable = new Readable({
    objectMode: true,
    read() {
        for (let i = 1; i <= 10000; i++) {
            const person = {
                id: randomUUID(),
                name: `Rafael-${i}`,
                randomic: Math.random()
            }
            this.push(person)
        }
        this.push(null)
    }
})


const transformJson = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        const json = `${JSON.stringify(chunk)}\n`
        callback(null, json)
    }
})



async function main() {

    try {
        await pipeline(
            readable,
            transformJson,
            createWriteStream(resolve(__dirname, 'file.json'), 'utf-8')
        )
    } catch (error) {
        console.error(error);
    }
}

main()