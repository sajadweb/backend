import * as Request from "request-promise";

export class SendSms {
    token: number;
    template: string = "";
    async verify(mobile: number, code: number): Promise<boolean> {

        return Request.post(process.env.SMS_KEY).then((r) => {
            console.log("rrrrrrrrrrrr 1");
            return true;
        }).catch(e => {
            // console.log("eeeeeee",);
            throw new Error(e);
        });
    }

}