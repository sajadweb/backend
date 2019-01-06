import { Entity, ObjectID, ObjectIdColumn, OneToMany, Column } from "typeorm";
import { Photo } from "./Photo";
import { type } from "os";
export type Permission = "ADMIN" | "USER" | "PROVIDER";


@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({default: "0"})
    role: number;

    @Column({default: "0"})
    status: number;

    @Column()
    permission: [Permission];

    @Column({ nullable: false, length: 11, unique: true })
    mobile: string;

    @Column()
    sms_code: number;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];
}
