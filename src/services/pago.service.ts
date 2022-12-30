import { ServiceBase } from "../config/base.service";
import { PagoDTO } from "../dto/pago.dto";
import { PagoEntity } from "../models/pago.entity";
import { CRUD } from "../shared/interfaces/crud.interface";

export class PagoService extends ServiceBase<PagoEntity> implements CRUD<PagoEntity, PagoDTO>{
    constructor(){
        super(PagoEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: PagoDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:PagoDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}