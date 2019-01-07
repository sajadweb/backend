import { Controller, Mutation, Query, ArgsValidator, Authorized } from "vesper";
import { EntityManager, FindManyOptions, ObjectID, IsNull, ObjectIdColumn, Like } from "typeorm";
import { Category } from "../entity/Category";
import { PageArgs, SaveArgs, Offset } from "../args/CategoryArgs";
import { Permission, Log } from "../../../tools";
import { CategoryArgsValidator } from "../validator/CategoryArgsValidator";

@Controller()
export class CategoryController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    categories(args: PageArgs): Promise<Category[]> {
        const findOptions: FindManyOptions = {};
        findOptions.cache = true;

        if (args.sort)
            findOptions.order = { title: args.sort };
        if (args.limit)
            findOptions.skip = args.limit;

        if (args.offset)
            findOptions.take = parseInt(Offset[args.offset]);
        else
            findOptions.take = 15

        findOptions.where = { parent: args.parent ? ObjectIdColumn(args.parent) : null };
        if (args.title)
            findOptions.where["title"] = Like(`%${args.title}%`);

        return this.entityManager.find(Category, findOptions);
    }

    @Query()
    //@Authorized([Permission.ADMIN])
    allCategories(args: PageArgs): Promise<Category[]> {
        const findOptions: FindManyOptions = {};
        findOptions.cache = true;

        if (args.sort)
            findOptions.order = { title: args.sort };
        if (args.limit)
            findOptions.skip = args.limit;

        if (args.offset)
            findOptions.take = parseInt(Offset[args.offset]);

        if (args.parent)
            findOptions.where["parent"] = ObjectIdColumn(args.parent);
        if (args.title)
            findOptions.where["title"] = Like(`%${args.title}%`);

        return this.entityManager.find(Category, findOptions);
    }

    @Query()
    category({ id }: { id: string }): Promise<Category> {
        return this.entityManager.findOne(Category, id);
    }

    @Mutation()
    // @Authorized([Permission.ADMIN])
    @ArgsValidator(CategoryArgsValidator)
    async newCategory({ id,title, parent }: SaveArgs): Promise<Boolean> {
        try {
            if(id){
                //TODO
            }
            const category = new Category();
            let parentId = null;
            if (parent) {
                const en = await this.entityManager.findOne(Category, { id: ObjectIdColumn(parent) });
                if (en !== null) {
                    parentId = en.id
                }
            }
            category.title = title;
            category.parent = parentId;
            const save = await this.entityManager.save(category);
            if (save !== null) {
                return true;
            }

            return false;
        } catch (error) {
            Log(error);
            throw new Error(error);
        }

    }

}