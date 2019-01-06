import { Entity, ObjectID, ObjectIdColumn, OneToMany, Column, ManyToOne } from "typeorm";

@Entity()
export class Category {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    parentId: ObjectID;

    @ManyToOne(() => Category, parent => parent.sub_category)
    parent: Category;

    @OneToMany(() => Category, sub_category => sub_category.parent)
    sub_category: Category[];
}
