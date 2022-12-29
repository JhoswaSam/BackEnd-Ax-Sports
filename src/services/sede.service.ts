import { ServiceBase } from "../config/base.service";
import { SedeDTO } from "../dto/sede.dto";
import { SedeEntity } from "../models/sede.entity";
import { CRUD } from "../app/interfaces/crud.interface";

export class SedeService extends ServiceBase<SedeEntity> implements CRUD<SedeEntity, SedeDTO>{
    constructor(){
        super(SedeEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: SedeDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:SedeDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}