'use strict';
const PORT = "5088"

const start = async ()=>{
    try {
        const fastify = require('./app');
        await fastify.listen({port : PORT})
        const { initSocket } = require('./socket-manager');
        initSocket(fastify.server);
        console.log(`App Listening On Port : ${PORT}`)
    } catch (error) {
        // fastify.log.error(error)
        console.log(error)
        process.exit(1)
    }
}

start()