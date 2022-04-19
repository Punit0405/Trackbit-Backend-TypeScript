import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID as string);
export default client;