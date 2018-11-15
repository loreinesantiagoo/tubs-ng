export interface Roles {
    admin?: boolean;
    user?: boolean;
    reader: boolean;
}

export class User {
    uid?: string;
    email?: any;
    password?: string;
    fullName?: string;
    newpassword?: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.roles = { reader: true };
    }
}

