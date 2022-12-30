import { DeleteResult, UpdateResult } from "typeorm";

export interface CRUD<T,A>{
    findAll():Promise<T[]>;
    findbyid(id:string):Promise<T|null>;
    create(body: A):Promise<T| null>;
    update(id:string, body:A): Promise<UpdateResult>;
    delete(id:string): Promise<DeleteResult>;
} 