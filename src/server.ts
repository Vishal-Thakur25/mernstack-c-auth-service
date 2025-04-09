// function Welcome(name: string) {
//     return name
// }
import app from './app'
import { Config } from './config'

// Welcome('Singh')

// If we want to use env variable in our function
// console.log(Config.PORT)

const startServer = () => {
    const PORT = Config.PORT
    try {
        app.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startServer() // This will start the server
