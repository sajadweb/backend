import { Entity, ObjectID, ObjectIdColumn, Column, JoinTable } from "typeorm";
import { Area } from "./Location";
import { Category } from "../../category/entity/Category";
export type Permission = "ADMIN" | "USER" | "PROVIDER";

export type Info = {
    shop_name: string,
    code: number,
    registration: string,
    kind: string,
    shaba_code: string,
    postal_code: string,
    postal_address: string,
  
};


@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: "0" })
    role: number;

    @Column({ default: "0" })
    status: number;

    @Column()
    permission: [Permission];

    @Column({ nullable: false, length: 11, unique: true })
    mobile: string;

    @Column()
    sms_code: number;

    @Column(type => Category)
    category: Category;

    @Column(type => Area)
    area: Area;

    @Column()
    info: [Info]
}
