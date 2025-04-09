import { config } from 'dotenv'

config()

const { PORT, NODE_ENV } = process.env

export const Config = {
    PORT,
    NODE_ENV, // this is to specify the environment to know which environment we use either Development or Testing
}
