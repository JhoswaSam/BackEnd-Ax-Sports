import { ServiceBase } from "../config/base.service";
import { PersonaDTO } from "../dto/persona.dto";
import { PersonaEntity } from "../models/persona.entity";
import { CRUD } from "./interface/crud.interface";

export class PersonaService extends ServiceBase<PersonaEntity> implements CRUD<PersonaEntity, PersonaDTO>{
    constructor(){
        super(PersonaEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: PersonaDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:PersonaDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}