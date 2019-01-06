import { GraphModule } from "vesper";
import { Category } from "./entity/Category";
import { CategoryController } from "./controller/CategoryController";

export default class UserModule implements GraphModule {

    controllers = [
        CategoryController
    ];

    entities = [
        Category
    ];

}