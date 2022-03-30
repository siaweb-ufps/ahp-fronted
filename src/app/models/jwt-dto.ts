export class JwtDto {
    token:string;
    type:string;
    email:string;
    authorities:string[];

    constructor(token:string, type:string, email:string, authorities:string[]) {
        this.token = token;
        this.type = type;
        this.email = email;
        this.authorities = authorities;
    }
}