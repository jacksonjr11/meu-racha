import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSettings1743903279408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP EXTENSION "uuid-ossp" CASCADE;
    `);
  }
}
