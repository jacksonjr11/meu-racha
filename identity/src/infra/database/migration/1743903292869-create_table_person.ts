import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePerson1743903292869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE application.person (
	        id uuid DEFAULT uuid_generate_v4() NOT NULL,
	        pk serial NOT null,
	        name varchar NOT NULL,
	        social_name varchar NOT NULL,
	        document varchar NOT NULL,
	        document_type varchar NOT NULL,
	        email varchar NOT NULL,
	        phone varchar NOT NULL,
	        CONSTRAINT person_pk PRIMARY KEY (pk)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table application.person;
    `);
  }
}
