import { prop, Typegoose, arrayProp, Ref } from "typegoose";

export class Category extends Typegoose {

    @prop()
    title: string;

    @prop({ ref: Category })
    parent?: Ref<Category>;

}
export class User extends Typegoose {
    @prop()
    mobile: string;

    @prop({ default: 0 })
    role?: number;

    @prop({ default: 0 })
    status?: number;

    @prop()
    sms_code: number;

    @prop()
    permission?: [string];

    @prop()
    firstName?: string;
    @prop()
    lastName?: string;

    @arrayProp({ itemsRef: Category })
    categories?: Ref<Category>[];
}
const model = new User().getModelForClass(User);
export default model; 