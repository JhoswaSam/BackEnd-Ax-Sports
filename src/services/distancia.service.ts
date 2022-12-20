import { ServiceBase } from "../config/base.service";
import { TipoDTO } from "../dto/tipo.dto";
import { DistanciaEntity } from "../models/distancia.entity";
import { TipoEntity } from "../models/tipo.entity";
import { CRUD } from "./interface/crud.interface";

export class DistanciaService extends ServiceBase<DistanciaEntity> implements CRUD<DistanciaEntity, TipoDTO>{
    constructor(){
        super(TipoEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: TipoDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:TipoDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}