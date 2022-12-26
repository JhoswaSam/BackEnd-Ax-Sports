import { MigrationInterface, QueryRunner } from "typeorm";

export class HorarioHoraFin1671828600303 implements MigrationInterface {
    name = 'HorarioHoraFin1671828600303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`horario\` ADD \`hora_fin\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`horario\` DROP COLUMN \`hora_fin\``);
    }

}
