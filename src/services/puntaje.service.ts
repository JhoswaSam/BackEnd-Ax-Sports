import { ServiceBase } from "../config/base.service";
import { PuntajeDTO } from "../dto/puntaje.dto";
import { PuntajeEntity } from "../models/puntaje.entity";
import { CRUD } from "../app/interfaces/crud.interface";

export class PuntajeService extends ServiceBase<PuntajeEntity> implements CRUD<PuntajeEntity, PuntajeDTO>{
    constructor(){
        super(PuntajeEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: PuntajeDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:PuntajeDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}