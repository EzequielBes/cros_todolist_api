import { MigrationInterface, QueryRunner } from "typeorm";

export class Account1731629648004 implements MigrationInterface {
    name = 'Account1731629648004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."account_account_id_key"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "email" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "username" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "account_id" text NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "account_account_id_key" ON "account" ("account_id") `);
    }

}
