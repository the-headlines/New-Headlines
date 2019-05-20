export interface Post {
    name: any;
    email: any;
    password: any;
    userId: number;
    id: number;
    body: any;
    title: any;
}

export class TokenParams {
    token: string;
    expiresIn: number;
    userId: any;
}
