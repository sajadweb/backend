import { buildVesperSchema, vesper } from "vesper";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { graphiqlExpress } from "apollo-server-express";
import { User } from "./entity/User";
import { getManager } from "typeorm";
import { CurrentUser } from "./model/CurrentUser";

buildVesperSchema({
    controllers: [__dirname + "/controller/**/*.ts"],
    resolvers: [__dirname + "/resolver/**/*.ts"],
    schemas: [__dirname + "/schema/**/*.graphql"],
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
        console.log('user',user)
        if (user) {
            const currentUser = new CurrentUser(user.id, user.firstName + " " + user.lastName);
            console.log('users current',currentUser)
            container.set(CurrentUser, currentUser);
        }
    }
}).then(schema => {

    const app = express();
    app.use(cors());
    app.use("/graphql", bodyParser.json(), vesper(schema));
    app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
    app.listen(3000, (error: any) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log("Server is up and running on port 3000");
    });

}).catch(error => console.error(error));





////last modify 
// import { bootstrap } from "vesper";
// import { User } from "./entity/User";
// import { getManager } from "typeorm";
// import { CurrentUser } from "./model/CurrentUser";

// bootstrap({
//     port: 3000,
//     cors: true,
//     controllers: [__dirname + "/controller/**/*.ts"],
//     resolvers: [__dirname + "/resolver/**/*.ts"],
//     schemas: [__dirname + "/schema/**/*.graphql"],
//     setupContainer: async (container, action) => {
//         // trivial implementation, in reality it should be token-based authorization
//         // const request = action.request; // user request, you can get http headers from it
//         // const entityManager = getManager();
//         // const user = await entityManager.findOneOrFail(User, { mobile: "09332369461" });
//         // if (user) {
//         //     const currentUser = new CurrentUser(user.id, user.firstName + " " + user.lastName);
//         //     container.set(CurrentUser, currentUser);
//         // }
//     }
// }).then(() => {
//     console.log("Your app is up and running on http://localhost:3000. " +
//         "You can use playground in development mode on http://localhost:3000/playground");
// }).catch(error => {
//     console.error(error.stack ? error.stack : error);
// });
