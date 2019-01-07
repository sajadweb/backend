import { buildVesperSchema, vesper } from "vesper";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { graphiqlExpress } from "apollo-server-express";
import { User } from "./modules/user/entity/User"
import { getManager } from "typeorm";
import { CurrentUser } from "./modules/user/model/CurrentUser";
import UserModule from "./modules/user";
import * as dotenv from 'dotenv';
import { deCode, enCode } from "./tools";
dotenv.config();

buildVesperSchema({
    // controllers: [__dirname + "/modules/**/controller/**/*.ts"],
    // resolvers: [__dirname + "/modules/**/resolver/**/*.ts"],
    modules: [
        UserModule,
    ],
    schemas: [__dirname + "/modules/**/schema/**/*.graphql"],

    authorizationChecker: (roles: string[], action) => {
        const currentUser = action.container.get(CurrentUser)
        console.log("currentUser", currentUser)
        if (currentUser.id === undefined) {
            throw new Error("The current user isn't defined")
        }

        if (roles.length > 0) {
            const hasRole = currentUser.permission.some((role: string) => {
            return roles.includes(role)
          })
          if (!hasRole) {
            throw new Error("The current user doesn't have permissions")
          }
        }
    },
    setupContainer: async (container, action) => {
        // trivial implementation, in reality it should be token-based authorization
        const request = action.request; // user request, you can get http headers from it
        const token = request.header("Authorization");
        if (token) {
            const user = deCode(token);
            if (user !== undefined && typeof user !== "string") {
                console.log('user', user);
                const currentUser = new CurrentUser(user["id"],
                    user["firstName"],
                    user["lastName"],
                    user["mobile"],
                    user["permission"]);
                container.set(CurrentUser, currentUser);
            }
        }

        // const entityManager = getManager();
        // const user = await entityManager.findOneOrFail(User, { mobile: "09332369461" });
        // if (user) {
        //     const currentUser = new CurrentUser(user.id, user.firstName + " " + user.lastName);
        //     container.set(CurrentUser, currentUser);
        // }

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
