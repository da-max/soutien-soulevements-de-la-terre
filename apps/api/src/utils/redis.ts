import { createClient } from 'redis'

const client = createClient({
    url: process.env.REDIS_URL as string,
    password: process.env.REDIS_PASSWORD as string,
})

await client.connect()

client.on('error', (e) => {
    console.log(e)
})

export { client }
