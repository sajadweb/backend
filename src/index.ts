import * as dotenv from "dotenv";
dotenv.config();
import { startDB, models } from './db';
import createServer from './createServer';

const db = startDB();
const context = {
    models,
    db,
};
const server = createServer(context);
// //TODO USE express middleware to handel Cookies (JWT)
// //TODO USE express middleware to  populate current user
server.express.get("/", function (req, res, next) {
    return res.send("bank receive")
})

server.start({
    endpoint: '/graphql',
    playground: '/graphql',
    getEndpoint: false,
    cors: {
        credentials: true
    }
}, deets => {
    console.log(`server is now running on port ${deets.port}`);
})