import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const { PORT, NODE_ENV, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } =
    process.env;

export const Config = {
    PORT,
    NODE_ENV, // this is to specify the environment to know which environment we use either Development or Testing
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    DB_NAME,
};
