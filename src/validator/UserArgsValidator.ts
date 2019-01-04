import { Service } from "typedi";
import { regMobile } from "./tools";

@Service()
export class UserArgsValidator {

    validate(args) {
        if (args.mobile === undefined)
            throw new Error(`موبایل نمیتواند خالی باشد.`);

        if (!regMobile(args.mobile))
            throw new Error(`شماره موبایل استفاده شده معتبر نمی باشد`);

    }

}