// function Welcome(name: string) {
//     return name
// }
import app from './app'
import { Config } from './config'
import logger from './config/logger'

// Welcome('Singh')

// If we want to use env variable in our function
// console.log(Config.PORT)

const startServer = () => {
    const PORT = Config.PORT
    try {
        app.listen(PORT, () => {
            // logger.error('Testing is in progress........')
            logger.warn('Testing is warn you')
            // logger.debug('debug') /// in this info should be 0 to 6 means if we use 4 then we can use upto 4 options not after 4
            console.log(`Server listening on ${PORT}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startServer() // This will start the server
