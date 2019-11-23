export class User {
    uid: string;
    email: string;
    name: string;

    constructor(uid: string, email: string, name: string) {
        this.uid = uid;
        this.email = email;
        this.name = name;
    }
}
