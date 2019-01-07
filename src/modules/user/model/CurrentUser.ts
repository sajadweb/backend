import { ObjectID } from "typeorm";

export class CurrentUser {
    id: ObjectID;
    firstName: string;
    lastName: string;
    mobile: string;
    permission: [string];

    constructor(id: ObjectID,
        firstName: string,
        lastName: string,
        mobile: string,
        permission: [string]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.permission = permission;
    }
}