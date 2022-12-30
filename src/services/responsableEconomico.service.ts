import { ServiceBase } from "../config/base.service";
import { ResponsableEconomicoDTO } from "../dto/responsableEconomico.dto";
import { ResponsableEconomicoEntity } from "../models/responsableEconomico.entity";
import { CRUD } from "../shared/interfaces/crud.interface";

export class ResponsableEconomicoService extends ServiceBase<ResponsableEconomicoEntity> implements CRUD<ResponsableEconomicoEntity, ResponsableEconomicoDTO>{
    constructor(){
        super(ResponsableEconomicoEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: ResponsableEconomicoDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:ResponsableEconomicoDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}