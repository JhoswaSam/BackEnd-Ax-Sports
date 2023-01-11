import { ServiceBase } from "../config/base.service";
import { EstudianteDTO } from "../dto/estudiante.dto";
import { EstudianteEntity } from "../models/estudiante.entity";
import { CRUD } from "../shared/interfaces/crud.interface";
import * as bcrypt from "bcrypt";

export class EstudianteService extends ServiceBase<EstudianteEntity> implements CRUD<EstudianteEntity, EstudianteDTO>{
    constructor(){
        super(EstudianteEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: EstudianteDTO){
        const newEstudiante = (await this.execRepository).create(body);

        // Ponemos el dni como contraseña
        newEstudiante.contrasenia = newEstudiante.dni

        // Encriptamos la contraseña
        const hast = await bcrypt.hash(newEstudiante.contrasenia, 10);

        // Creamos el usuario
        const letraNombre = newEstudiante.nombre.split(' ')[0].charAt(0).toLowerCase()
        const apellido = newEstudiante.apellidos.split(' ')[0].toLowerCase()
        const correo = letraNombre+apellido+"_std"+'@gmail.com'

        // verificamos si el usuario existe 
        let exist = await this.findUsuario(correo)

        if (exist) {
            return null
        }else{

            newEstudiante.usuario = correo
            newEstudiante.contrasenia = hast;
    
            return (await this.execRepository).save(newEstudiante);
        }
    }

    async update(id:string, body:EstudianteDTO){
        const newEstudiante = (await this.execRepository).create(body);
        const hast = await bcrypt.hash(newEstudiante.contrasenia, 10);
        newEstudiante.contrasenia = hast;
        return (await this.execRepository).update(id,newEstudiante);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

    /**
     * === PETITIONS WITH QUERY BUILDER ===
     */

    async findUser(usuario : string):Promise<EstudianteEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("estudiante")
            .addSelect("estudiante.contrasenia")
            .where({ usuario })
            .getOne();

    }

    async findEstudianteWithSede(id: string):Promise<EstudianteEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder('estudiante')
            .leftJoinAndSelect('estudiante.sede','sede')
            .where({ id })
            .getOne();
    }

    async findUsuario(usuario: string):Promise<EstudianteEntity|null>{
        return (await this.execRepository)
        .createQueryBuilder("estudiante")
        .addSelect("estudiante.usuario")
        .where({ usuario })
        .getOne();
    }

    async misPagos(id:string):Promise<any>{
        return (await this.execRepository)
            .createQueryBuilder("estudiante")
            .leftJoinAndSelect("estudiante.pagos","pago")
            .where({id})
            .getOne();
    }

}