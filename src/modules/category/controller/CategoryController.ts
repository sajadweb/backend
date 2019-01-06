import { Controller, Mutation, Query, ArgsValidator, Authorized } from "vesper";
import { EntityManager, FindManyOptions, ObjectID, IsNull } from "typeorm";
import { Category } from "../entity/Category";
import { PageArgs, SaveArgs } from "../args/CategoryArgs";

@Controller()
export class CategoryController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    categories(args: PageArgs): Promise<Category[]> {

        const findOptions: FindManyOptions = {};
        if (args.limit)
            findOptions.skip = args.limit;
        if (args.offset)
            findOptions.take = args.offset;
        findOptions.where = { parentId: null }
        return this.entityManager.find(Category, findOptions);
    }

    @Query()
    category({ id }: { id: string }): Promise<Category> {
        return this.entityManager.findOne(Category, id);
    }

    @Mutation()
    async newItem(args: { title: string, parent: ObjectID }): Promise<Boolean> {
        //save cate 
        const cate = new Category();
        const parent = await this.entityManager.findOne(Category, { id: args.parent })
        cate.title = args.title;
        cate.parentId = args.parent;
        const save = await this.entityManager.save(cate);
        return true;
    }

}