export enum Offset {
    Five = 5,
    Ten = 10,
    Fifteen = 15,
    Twenty = 20,
    TwentyFive = 25,
    Fifty = 50,
    Hundred = 100
}

export interface Pages {
    limit?: number;
    offset?: Offset;
}

export enum Permission {
    ADMIN = "ADMIN",
    USER = "USER",
    PROVIDER = "PROVIDER"
}