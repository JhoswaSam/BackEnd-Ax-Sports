import { ServiceBase } from "../config/base.service";
import { HorarioDTO } from "../dto/horario.dto";
import { HorarioEntity } from "../models/horario.entity";
import { CRUD } from "../shared/interfaces/crud.interface";

export class HorarioService extends ServiceBase<HorarioEntity> implements CRUD<HorarioEntity, HorarioDTO>{
    constructor(){
        super(HorarioEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: HorarioDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:HorarioDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}