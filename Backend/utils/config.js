import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWTkey = process.env.jwt_secret;

export { MONGODB_URL, PORT, JWTkey }
