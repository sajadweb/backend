import { GraphModule } from "vesper";
import { User } from "./entity/User";
import { UserController } from "./controller/UserController";

export default class UserModule implements GraphModule {

    controllers = [
        UserController
    ];

    entities = [
        User
    ];

}