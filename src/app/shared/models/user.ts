export interface User {
    uid?: string;
    email?: any;
    password?: string;
    fullName?: string;
    token?: string;
    resetId?: string;
    newpassword?: string;
    // roles: Roles;
}

export interface Roles {
    admin?: boolean;
    user?: boolean;
    reader?: boolean;
}
