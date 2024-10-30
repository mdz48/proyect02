import dotenv from 'dotenv'
import mysql, { ResultSetHeader } from 'mysql2/promise';
import { User, UserInterface } from '../models/User';
dotenv.config();

export class UserRepository {
    private connection: mysql.Pool;

    constructor() {
        
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
        });       
        
    }

    async getAllUsers(): Promise<User[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM users');   
        return rows as User[];
    }

    async getId(id:number): Promise<User | null> {      
        
    //     try {
    //         const [rows]:any = await this.connection.execute('SELECT * FROM users WHERE id=?',[id]);
    //         return new User(
    //             rows[0].id,
    //             rows[0].name,
    //             rows[0].lastname,
    //           );
    //     } catch (error) {
    //           return null;
    //     }    
    return null   
    }

    // async getMail(mail:string): Promise<User | null> {
    //     try {
    //         const [rows]:any = await this.connection.execute('SELECT * FROM users WHERE mail=?',[mail]);
    //         return new User(
    //             rows[0].id,
    //             rows[0].name,
    //             rows[0].lastname,
    //           );
    //     } catch (error) {
    //         return null;
    //     }
    // }   
    
    async createNewUser(data:any): Promise<User | null> {
        let user = null
        
        try {
            const [result]:any = await this.connection.execute('INSERT INTO users (mail, password, height, weight, sex) VALUES (?, ?, ?, ?, ?)',[data.mail,data.password, data.height, data.weight, data.sex]);
            return new User(result.insertId, data.mail, data.password, data.height, data.weight, data.sex) 
        }
        catch(error){
            return null
        }

    }

    async updateUser(id:number, data:any): Promise<User | null> {        
        // try {
        //     const [result] = await this.connection.execute('UPDATE users SET name=?, lastname=? WHERE id=?',[data.name,data.lastname,id]);
        //     return new User(id, data.name, data.lastname) 
        // }
        // catch(error){            
        //     return null
        // }   
    return null
    }

    async updateUserPartial(id:number,data:any): Promise<User | null> {
        const [rows] = await this.connection.execute('UPDATE INTO users (name, lastname) VALUES (?, ?)',[data.name,data.lastName]);
        return null;
    }
    async deleteUser(id:number): Promise<any | null> {
        try {
            const [result] = await this.connection.execute('DELETE FROM users WHERE id=?',[id]);
            return {status: true} 
        }
        catch(error){            
            return null
        }  
    }
}