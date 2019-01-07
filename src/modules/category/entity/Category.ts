import { Entity, ObjectID, ObjectIdColumn, OneToMany, Column, ManyToOne } from "typeorm";

@Entity()
export class Category {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    parent: ObjectID;

}
