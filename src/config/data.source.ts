import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
    path: process.env.NODE_ENV !== undefined ? 
    `.${process.env.NODE_ENV.trim()}.env`
    : ".env"
})

const Config :DataSourceOptions = {
    type: "mysql",
    host: process.env.BD_HOST,
    port: Number(process.env.BD_PORT) ,
    username: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    entities: [__dirname+"/../**/*.entity{.ts,.js}"],
    migrations: [__dirname+"/../../migrations/*{.ts,.js}"],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
}

export const AppDataSourece: DataSource = new DataSource(Config);