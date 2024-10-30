export class User {
    private iduser: number;
    private mail: string;
    private password: string;
    private weight: number;
    private height: number;
    private sex: string;
    constructor(iduser:number, mail:string, password: string, sex: string, weight: number, height: number){
        this.iduser = iduser
        this.mail = mail;
        this.password = password;
        this.weight = weight;
        this.height = height;
        this.sex = sex;
    }
}

export interface UserInterface {
    iduser: number;
    mail: string;
    password: string;
    sex: string;
    weight: number;
    height: number;
}