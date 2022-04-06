export class NewUser {
    nombre: string;
    email: string;
    celular: string;
    profesion: string;
    empresa: string;
    password: string;
    // roles: string[];

    constructor(celular:string, email:string, empresa:string, profesion:string, password:string, nombre:string,) {
        this.celular = celular;
        this.nombre = nombre;
        this.empresa = empresa;
        this.profesion = profesion;
        // this.roles = roles;
        this.email = email;
        this.password = password;
    }
}