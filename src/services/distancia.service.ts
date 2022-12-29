import { ServiceBase } from "../config/base.service";
import { DistanciaDTO } from "../dto/distancia.dto";
import { DistanciaEntity } from "../models/distancia.entity";
import { CRUD } from "../app/interfaces/crud.interface";

export class DistanciaService extends ServiceBase<DistanciaEntity> implements CRUD<DistanciaEntity, DistanciaDTO>{
    constructor(){
        super(DistanciaEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: DistanciaDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:DistanciaDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}