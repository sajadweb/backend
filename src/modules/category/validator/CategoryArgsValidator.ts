import { Service } from "typedi";
import { SaveArgs } from "../args/CategoryArgs";
import { Category } from "../entity/Category";
import { findOneOrFail } from "../../../tools";


@Service()
export class CategoryArgsValidator {

    async validate(args: SaveArgs) {
        if (args.title === undefined)
            throw new Error(`فیلد عنوان نمی تواند خالی باشد.`);

        if (args.title.length < 3)
            throw new Error(`فیلد عنوان نمی تواند کمتر از سه کارکتر باشد.`);

        
        const en = await  findOneOrFail(Category, { title: args.title });
        if (en) {
            throw new Error(`فیلد عنوان نمی تواند تکرار باشد.`);
        }
    }

}