import {Entity, ObjectID, ObjectIdColumn, ManyToOne, Column} from "typeorm";
import {User} from "./User";

@Entity()
export class Photo {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    filename: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.photos)
    user: User;

}
