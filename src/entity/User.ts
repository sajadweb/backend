import {Entity, PrimaryGeneratedColumn, OneToMany, Column} from "typeorm";
import {Photo} from "./Photo";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];

}
