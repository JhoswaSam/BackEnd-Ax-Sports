import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { AppDataSourece } from "./data.source";

export abstract class ConfigServer{
    constructor(){
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv
        })
    }

    /**
     * 
     * @param k -> Nombre de la variable 
     * @returns -> Valor del .env y si no se encuentra el valor se retorna una cadena vacia
     */
    public getEnviroment(k: string): string{
        return process.env[k] || "";
    }


    /**
     * 
     * @param k -> Nombre de la variable
     * @returns -> Valores numericos del .env
     */
    public getNumberEnv(k:string):number{
        return Number(this.getEnviroment(k));
    }


    /**
     * configuraciones para el servidor
     */
    public get nodeEnv(): string{
        return this.getEnviroment('NODE_ENV').trim();
    }


    /**
     * 
     * @param path ruta del env
     * @returns todas las variables dentro de ese archivo
     */
    public createPathEnv(path:string):string{
        const arrEnv: string[] = ['env'];
        
        if (path.length > 0) {
            const stringToArray = path.split('.');
            arrEnv.unshift(...stringToArray)
        }
        return '.'+arrEnv.join('.'); 
    }


    get initConnection(): Promise<DataSource> {
        return AppDataSourece.initialize()
    }
}