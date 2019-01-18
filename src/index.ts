import * as dotenv from "dotenv";
dotenv.config();
import { startDB, models } from './db';
import createServer from './createServer';
import { deCode } from "./tools";

const db = startDB();
const context = {
    models,
    db,
};
const server = createServer(context);
// //TODO USE express middleware to handel Cookies (JWT)
server.express.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const user = deCode(token);
        if (user) {
            req["userId"] = user.id;
        }
    }
    next();
});

server.express.use(async (req, res, next) => {

    if (!req["userId"]) return next();
    const User = models.User
    const user = await User.findById(req["userId"]);
    if (user) {
        req["user"] = user;
    }
    next();
});
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