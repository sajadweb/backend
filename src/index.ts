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

        if (currentUser.id === undefined) {
            throw new Error("The current user isn't defined")
        }

        // if (roles.length > 0) {
        //   const hasRole = currentUser.roles.some((role: string) => {
        //     return roles.includes(role)
        //   })
        //   if (!hasRole) {
        //     throw new Error("The current user doesn't have permissions")
        //   }
        // }
    },
    setupContainer: async (container, action) => {
        // trivial implementation, in reality it should be token-based authorization
        // const request = action.request; // user request, you can get http headers from it
        const entityManager = getManager();
        const user = await entityManager.findOneOrFail(User, { mobile: "09332369461" });
        // console.log('user', user)
        if (user) {
            const currentUser = new CurrentUser(user.id, user.firstName + " " + user.lastName);
            // console.log('users current', currentUser)
            container.set(CurrentUser, currentUser);
        }
    }
}).then(schema => {

    const app = express();
    app.use(cors());
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
