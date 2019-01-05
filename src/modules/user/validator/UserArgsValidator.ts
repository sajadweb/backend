import { Service } from "typedi";
import { isMobile } from "../../../tools";

@Service()
export class UserArgsValidator {

    validate(args) {
        if (args.mobile === undefined)
            throw new Error(`موبایل نمی تواند خالی باشد.`);

        if (!isMobile(args.mobile))
            throw new Error(`شماره موبایل استفاده شده معتبر نمی باشد`);

    }

}