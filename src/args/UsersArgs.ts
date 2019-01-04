export interface UsersArgs {
    limit?: number;
    offset?: number;
}

export interface UserSignInArgs {
    mobile: string;
}

export interface UserVerifyArgs extends UserSignInArgs {
    code: string;
}

export interface UserSaveArgs {
    id?: string;
    mobile: string;
    firstName: string;
    lastName: string;
}