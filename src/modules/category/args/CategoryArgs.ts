import { Pages } from "../../../tools";

export { Offset } from "../../../tools";

export interface PageArgs extends Pages {
    parent?: string;
    title?: string;
    sort?: "ASC" | "DESC"
}


export interface SaveArgs {
    id?: string;
    title: string;
    parent: string;
}