import { Resolve, Resolver, ResolverInterface } from "vesper";
import { User } from "../entity/User";
import { CurrentUser } from "../model/CurrentUser";

@Resolver(User)
export class UserResolver implements ResolverInterface<User> {

    constructor(private currentUser?: CurrentUser) {
        console.log("UserResolver", currentUser)
    }

    @Resolve()
    async addedByCurrentUser(user: User) {
        console.log("1 addedByCurrentUser", this.currentUser)
        if (!this.currentUser)
            return false;
        console.log("2 addedByCurrentUser", this.currentUser)
        return true;
    }

}