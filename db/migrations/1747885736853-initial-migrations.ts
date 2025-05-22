import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1747885736853 implements MigrationInterface {
    name = 'InitialMigrations1747885736853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "pincode" integer NOT NULL, "line1" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "age" integer NOT NULL, "name" character varying NOT NULL, "address_id" integer, CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "REL_2a4f5082f1be346e2b8cdec219" UNIQUE ("address_id"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
