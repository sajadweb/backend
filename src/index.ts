import { buildVesperSchema, vesper } from "vesper";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { graphiqlExpress } from "apollo-server-express";
import { User } from "./modules/user/entity/User"
import { getManager } from "typeorm";
import { CurrentUser } from "./modules/user/model/CurrentUser";
import UserModule from "./modules/user";
import CategoryModule from "./modules/category";
import * as dotenv from 'dotenv';
import { deCode, enCode } from "./tools";
dotenv.config();

buildVesperSchema({
    modules: [
        UserModule,
        CategoryModule,
    ],
    schemas: [__dirname + "/modules/**/schema/**/*.graphql"],

    authorizationChecker: (roles: string[], action) => {
        const currentUser = action.container.get(CurrentUser);
        console.log("authorization checker");
        if (currentUser.id === undefined) {
            throw new Error("کاریر گرامی شما هنوز وارد نشده اید")
        }
        if (currentUser.permission === undefined) {
            throw new Error("کاریر گرامی هیچ سطح دسترسی برای شما تعریف نشده")
        }
        if (roles.length > 0) {
            const hasRole = currentUser.permission.some((role: string) => {
                return roles.includes(role)
            })
            if (!hasRole) {
                throw new Error("کاریر گرامی برای شما دسترسی  به این نمایه تعریف نشده")
            }
        }
    },
    setupContainer: async (container, action) => {
        // trivial implementation, in reality it should be token-based authorization
        const request = action.request; // user request, you can get http headers from it
        const token = request.header("Authorization");
        console.log('token', token);
        if (token) {
            const user = deCode(token);
            console.log('user', user);
            if (user !== undefined && typeof user !== "string") {
                console.log('user', user);
                const currentUser = new CurrentUser(user["id"],
                    user["firstName"],
                    user["lastName"],
                    user["mobile"],
                    user["permission"]);
                container.set(CurrentUser, currentUser);
            } else {
                const currentUser = new CurrentUser(undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined);
                container.set(CurrentUser, currentUser);
            }
        } else {
            const currentUser = new CurrentUser(undefined,
                undefined,
                undefined,
                undefined,
                undefined);
            container.set(CurrentUser, currentUser);
        }
    }
}).then(schema => {

    const app = express();
    app.use(cors());
    app.get("/bank", async (rq, rs, nx) => {
        const entityManager = getManager();
        const user = await entityManager.findOneOrFail(User, { mobile: "09332369461" });
        if (user) {
            rs.send(user);
        }
        rs.send("html");
    });
    app.use("/graphql", bodyParser.json(), vesper(schema));
    app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
    app.listen(process.env.PORT, (error: any) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log("Server is up and running on port " + process.env.PORT);
    });

}).catch(error => console.error(error));
