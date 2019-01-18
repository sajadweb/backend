import * as JWT from "jsonwebtoken";
export function enCode(data: any) {
    return JWT.sign(data, process.env.APP_SECRET);
}
export function deCode(token: string): any {
    // return process.env.APP_SECRET;
    try {
        return JWT.verify(token.trim(), process.env.APP_SECRET);
    } catch (error) {
        return null;
    }

}