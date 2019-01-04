import { Controller, Mutation, Query,ArgsValidator, Authorized } from "vesper";
import { EntityManager, FindManyOptions } from "typeorm";
import { UsersArgs, UserSaveArgs, UserSignInArgs, UserVerifyArgs } from "../args/UsersArgs";
import { User } from "../entity/User";
import { UserArgsValidator } from "../validator/UserArgsValidator";
import { CurrentUser } from "../model/CurrentUser";

@Controller()
export class UserController {

    constructor(private entityManager: EntityManager,private currentUser?: CurrentUser) {
        console.log('UserController',currentUser);
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
    @Authorized(["User","Admin"])
    user({ id }: { id: string }): Promise<User> {
        return this.entityManager.findOne(User, id);
    }

    @Mutation()
    async userSignIn(args: UserSignInArgs): Promise<boolean> {
        try {
            //Check mobile has exists
            //send verify code
            //TODO send sms
            //return true
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    @Mutation()
    async userVerify(args: UserVerifyArgs): Promise<User> {
        try {
            //Check mobile and code has exists
            const myUser = await this.entityManager.findOne(User, { mobile: args.mobile });
            if (myUser != undefined) {
                throw new Error("شماره موبایل تکراری می باشد");
            }
            //jwt code

            //return User
            return myUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    @Mutation()
    @ArgsValidator(UserArgsValidator)
    async userSignUp(args: UserSaveArgs): Promise<boolean> {
        try {
            //Check mobile has unique
            const myUser = await this.entityManager.findOne(User, { mobile: args.mobile })
            if (myUser != undefined) {
                throw new Error("شماره موبایل تکراری می باشد");
            }
            //save user 
            const user = new User();
            user.firstName = args.firstName;
            user.lastName = args.lastName;
            user.mobile = args.mobile;
            const save = await this.entityManager.save(user);
            if (save === null) {
                throw new Error("مشکلی در ثبت وجود دارد");
            }
            //send verify code
            //TODO send sms
            //return true
            return true;
        } catch (error) {
            throw new Error(error);
        }

    }

}