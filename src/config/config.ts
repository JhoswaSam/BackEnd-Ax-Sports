import * as dotenv from "dotenv";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Connection, createConnection } from "typeorm";

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


    /**
     *  BD_PORT = 3306
        BD_HOST = localhost
        BD_DATABASE= bd_alpha_sports
        BD__USER=root
        BD_PASSWORD=root
     */
    public get typeORMConfig():MysqlConnectionOptions{
        return {
            type: "mysql",
            host: this.getEnviroment("BD_HOST"),
            port: this.getNumberEnv("BD_PORT"),
            username: this.getEnviroment("BD_USER"),
            password: this.getEnviroment("BD_PASSWORD"),
            database:this.getEnviroment("BD_DATABASE"),
            entities: [__dirname+"/../**/*.entity{.ts,.js}"],
            migrations: [__dirname+"/../../migrations/*{.ts,.js}"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy()
        }
    }

    async bdConnection(): Promise<Connection> {
        return await createConnection(this.typeORMConfig);
    }
}