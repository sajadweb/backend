import {Controller, Mutation, Query} from "vesper";
import {EntityManager, FindManyOptions} from "typeorm";
import {UsersArgs} from "../args/UsersArgs";
import {UserSaveArgs} from "../args/UserSaveArgs";
import {User} from "../entity/User";

@Controller()
export class UserController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    users(args: UsersArgs): Promise<User[]> {

        const findOptions: FindManyOptions = {};
        if (args.limit)
            findOptions.skip = args.limit;
        if (args.offset)
            findOptions.take = args.offset;

        return this.entityManager.find(User, findOptions);
    }

    @Query()
    user({ id }: { id: number }): Promise<User> {
        return this.entityManager.findOne(User, id);
    }

    @Mutation()
    async userSave(args: UserSaveArgs): Promise<User> {
        const user = args.id ? await this.entityManager.findOne(User, args.id) : new User();
        user.firstName = args.firstName;
        user.lastName = args.lastName;
        return this.entityManager.save(user);
    }

    @Mutation()
    async userDelete({ id }: { id: number }): Promise<boolean> {
        const user = await this.entityManager.findOne(User, id);
        await this.entityManager.remove(user);
        return true;
    }

}