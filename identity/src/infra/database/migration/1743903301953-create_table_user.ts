import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1743903301953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE application.user  (
	        id uuid DEFAULT uuid_generate_v4() NOT NULL,
	        pk serial NOT null,
	        username varchar NOT NULL,
	        login varchar NOT NULL,
	        password varchar NOT NULL,
	        type varchar NOT NULL,
	        person_fk serial NOT NULL,
	        CONSTRAINT user_pk PRIMARY KEY (pk),
            FOREIGN KEY (person_fk) REFERENCES application.person(pk)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table application.user;
    `);
  }
}
