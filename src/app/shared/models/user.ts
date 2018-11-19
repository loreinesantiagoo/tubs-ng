export interface Roles {
    admin: boolean;
    editor: boolean;
    reader: boolean;
}

export class User {
    uid?: string;
    email?: any;
    password?: string;
    displayName?: string;
    newpassword?: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.roles = { reader: true, admin: true, editor: true };
    }
}

