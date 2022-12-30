import { ServiceBase } from "../config/base.service";
import { TipoDTO } from "../dto/tipo.dto";
import { TipoEntity } from "../models/tipo.entity";
import { CRUD } from "../shared/interfaces/crud.interface";

export class TipoService extends ServiceBase<TipoEntity> implements CRUD<TipoEntity, TipoDTO>{
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