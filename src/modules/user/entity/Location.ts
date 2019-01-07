import {Entity, ObjectID, ObjectIdColumn, Column, JoinTable} from "typeorm";

@Entity()
export class Province {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

}

@Entity()
export class City {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column(type => Province)
    @JoinTable()
    province: Province;
}

@Entity()
export class Area {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column(type => Province)
    @JoinTable()
    province: Province;

    @Column(type => City)
    @JoinTable()
    city: City;
}
