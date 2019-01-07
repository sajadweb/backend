import * as JWT from "jsonwebtoken";
export function enCode(data: any) {
    return JWT.sign(data, process.env.APP_SECRET);
}
export function deCode(token: string){
    // return process.env.APP_SECRET;
    return JWT.verify(token, process.env.APP_SECRET);
}