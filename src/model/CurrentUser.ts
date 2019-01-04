import { ObjectID } from "typeorm";

export class CurrentUser {
    id: ObjectID;
    name: string;

    constructor(id: ObjectID, name: string) {
        this.id = id;
        this.name = name;
    }
}