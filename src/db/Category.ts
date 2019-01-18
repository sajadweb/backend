import { prop, Typegoose, Ref } from "typegoose";


export class Category extends Typegoose {

    @prop()
    title: string;

    @prop({ ref: Category })
    parent?: Ref<Category>;

}
const model = new Category().getModelForClass(Category);
export default model; 