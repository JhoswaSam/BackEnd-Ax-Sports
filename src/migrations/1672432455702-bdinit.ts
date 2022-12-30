import { MigrationInterface, QueryRunner } from "typeorm";

export class bdinit1672432455702 implements MigrationInterface {
    name = 'bdinit1672432455702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`evento\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tipo\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`administrador\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`usuario\` varchar(255) NOT NULL, \`contrasenia\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellidos\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`fecha_nacimiento\` timestamp NULL, \`tipo_id\` varchar(36) NULL, \`sede_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_57d560d3f2d35babaff28318d4\` (\`usuario\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sede\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`horario\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`dias\` varchar(255) NOT NULL, \`monto\` int NOT NULL, \`categoria\` varchar(255) NOT NULL, \`hora\` varchar(255) NOT NULL, \`hora_fin\` varchar(255) NOT NULL, \`sede_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`inscripcion\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`pago_id\` varchar(36) NULL, \`estudiante_id\` varchar(36) NULL, \`horario_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pago\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mes\` varchar(255) NOT NULL, \`pago_total\` int NOT NULL, \`medio\` varchar(255) NOT NULL, \`comprobante\` varchar(255) NOT NULL, \`responsable_economico_id\` varchar(36) NULL, \`estudiante_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`responsableEconomico\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`usuario\` varchar(255) NOT NULL, \`contrasenia\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellidos\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_cfaebf85d2ccd5019c77ec0244\` (\`usuario\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`estudiante\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`usuario\` varchar(255) NOT NULL, \`contrasenia\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellidos\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`telefono\` varchar(255) NOT NULL, \`fecha_nacimiento\` timestamp NULL, \`sexo\` varchar(255) NOT NULL, \`responsable_economico_id\` varchar(36) NULL, \`sede_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_45422e56fabc7c76ff1fb21043\` (\`usuario\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`puntaje\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fecha\` timestamp NULL, \`distancia_id\` varchar(36) NULL, \`evento_id\` varchar(36) NULL, \`estudiante_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`distancia\` (\`id\` varchar(36) NOT NULL, \`create_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`horario_administradores_administrador\` (\`horario_id\` varchar(36) NOT NULL, \`administrador_id\` varchar(36) NOT NULL, INDEX \`IDX_f8ee4b11ce62e0fb8c5bf612be\` (\`horario_id\`), INDEX \`IDX_165ca54c34cf8ab3fb36ed64a2\` (\`administrador_id\`), PRIMARY KEY (\`horario_id\`, \`administrador_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_2a6ca12a6277cbb1fce66d03a16\` FOREIGN KEY (\`tipo_id\`) REFERENCES \`tipo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_e1186b0dfdc7812a50b76126487\` FOREIGN KEY (\`sede_id\`) REFERENCES \`sede\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`horario\` ADD CONSTRAINT \`FK_a97d5b1918ad9ff283fe6b9c6af\` FOREIGN KEY (\`sede_id\`) REFERENCES \`sede\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inscripcion\` ADD CONSTRAINT \`FK_6209c6e8d9ffdbd52d0b7cb4ab2\` FOREIGN KEY (\`pago_id\`) REFERENCES \`pago\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inscripcion\` ADD CONSTRAINT \`FK_b0500333a29ab129a02805ad0f3\` FOREIGN KEY (\`estudiante_id\`) REFERENCES \`estudiante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`inscripcion\` ADD CONSTRAINT \`FK_34b93fea7b6eb9b489fab550c02\` FOREIGN KEY (\`horario_id\`) REFERENCES \`horario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pago\` ADD CONSTRAINT \`FK_2ddad97321056f838f63b9dc352\` FOREIGN KEY (\`responsable_economico_id\`) REFERENCES \`responsableEconomico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pago\` ADD CONSTRAINT \`FK_933aa476135635d936b374bfdb0\` FOREIGN KEY (\`estudiante_id\`) REFERENCES \`estudiante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`estudiante\` ADD CONSTRAINT \`FK_d12002191c90fe8a7b96cab5ba9\` FOREIGN KEY (\`responsable_economico_id\`) REFERENCES \`responsableEconomico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`estudiante\` ADD CONSTRAINT \`FK_76634f9ef0afb1fc88ea5be138d\` FOREIGN KEY (\`sede_id\`) REFERENCES \`sede\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`puntaje\` ADD CONSTRAINT \`FK_412c4365e9024feee96a84fb115\` FOREIGN KEY (\`distancia_id\`) REFERENCES \`distancia\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`puntaje\` ADD CONSTRAINT \`FK_0539646d9afc63fcdbc80de392a\` FOREIGN KEY (\`evento_id\`) REFERENCES \`evento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`puntaje\` ADD CONSTRAINT \`FK_31dbe576a4cd0acda1b53aba693\` FOREIGN KEY (\`estudiante_id\`) REFERENCES \`estudiante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`horario_administradores_administrador\` ADD CONSTRAINT \`FK_f8ee4b11ce62e0fb8c5bf612bea\` FOREIGN KEY (\`horario_id\`) REFERENCES \`horario\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`horario_administradores_administrador\` ADD CONSTRAINT \`FK_165ca54c34cf8ab3fb36ed64a2e\` FOREIGN KEY (\`administrador_id\`) REFERENCES \`administrador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`horario_administradores_administrador\` DROP FOREIGN KEY \`FK_165ca54c34cf8ab3fb36ed64a2e\``);
        await queryRunner.query(`ALTER TABLE \`horario_administradores_administrador\` DROP FOREIGN KEY \`FK_f8ee4b11ce62e0fb8c5bf612bea\``);
        await queryRunner.query(`ALTER TABLE \`puntaje\` DROP FOREIGN KEY \`FK_31dbe576a4cd0acda1b53aba693\``);
        await queryRunner.query(`ALTER TABLE \`puntaje\` DROP FOREIGN KEY \`FK_0539646d9afc63fcdbc80de392a\``);
        await queryRunner.query(`ALTER TABLE \`puntaje\` DROP FOREIGN KEY \`FK_412c4365e9024feee96a84fb115\``);
        await queryRunner.query(`ALTER TABLE \`estudiante\` DROP FOREIGN KEY \`FK_76634f9ef0afb1fc88ea5be138d\``);
        await queryRunner.query(`ALTER TABLE \`estudiante\` DROP FOREIGN KEY \`FK_d12002191c90fe8a7b96cab5ba9\``);
        await queryRunner.query(`ALTER TABLE \`pago\` DROP FOREIGN KEY \`FK_933aa476135635d936b374bfdb0\``);
        await queryRunner.query(`ALTER TABLE \`pago\` DROP FOREIGN KEY \`FK_2ddad97321056f838f63b9dc352\``);
        await queryRunner.query(`ALTER TABLE \`inscripcion\` DROP FOREIGN KEY \`FK_34b93fea7b6eb9b489fab550c02\``);
        await queryRunner.query(`ALTER TABLE \`inscripcion\` DROP FOREIGN KEY \`FK_b0500333a29ab129a02805ad0f3\``);
        await queryRunner.query(`ALTER TABLE \`inscripcion\` DROP FOREIGN KEY \`FK_6209c6e8d9ffdbd52d0b7cb4ab2\``);
        await queryRunner.query(`ALTER TABLE \`horario\` DROP FOREIGN KEY \`FK_a97d5b1918ad9ff283fe6b9c6af\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_e1186b0dfdc7812a50b76126487\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_2a6ca12a6277cbb1fce66d03a16\``);
        await queryRunner.query(`DROP INDEX \`IDX_165ca54c34cf8ab3fb36ed64a2\` ON \`horario_administradores_administrador\``);
        await queryRunner.query(`DROP INDEX \`IDX_f8ee4b11ce62e0fb8c5bf612be\` ON \`horario_administradores_administrador\``);
        await queryRunner.query(`DROP TABLE \`horario_administradores_administrador\``);
        await queryRunner.query(`DROP TABLE \`distancia\``);
        await queryRunner.query(`DROP TABLE \`puntaje\``);
        await queryRunner.query(`DROP INDEX \`IDX_45422e56fabc7c76ff1fb21043\` ON \`estudiante\``);
        await queryRunner.query(`DROP TABLE \`estudiante\``);
        await queryRunner.query(`DROP INDEX \`IDX_cfaebf85d2ccd5019c77ec0244\` ON \`responsableEconomico\``);
        await queryRunner.query(`DROP TABLE \`responsableEconomico\``);
        await queryRunner.query(`DROP TABLE \`pago\``);
        await queryRunner.query(`DROP TABLE \`inscripcion\``);
        await queryRunner.query(`DROP TABLE \`horario\``);
        await queryRunner.query(`DROP TABLE \`sede\``);
        await queryRunner.query(`DROP INDEX \`IDX_57d560d3f2d35babaff28318d4\` ON \`administrador\``);
        await queryRunner.query(`DROP TABLE \`administrador\``);
        await queryRunner.query(`DROP TABLE \`tipo\``);
        await queryRunner.query(`DROP TABLE \`evento\``);
    }

}
