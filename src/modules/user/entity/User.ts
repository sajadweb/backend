import { Entity, ObjectID, ObjectIdColumn, OneToMany, Column } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true,length: 11,unique: true })
    mobile: string;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];
}
