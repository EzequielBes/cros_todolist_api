import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11731814979993 implements MigrationInterface {
    name = 'Migration11731814979993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtasks" DROP CONSTRAINT "FK_bde15cf8f7b07bb4ccad8ef6fa3"`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP CONSTRAINT "FK_01cd64f9c2305cc38f9ce62bbfa"`);
        await queryRunner.query(`CREATE TABLE "main_task" ("id" SERIAL NOT NULL, "owner_id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "tag" character varying NOT NULL, "document" bytea NOT NULL, "status" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_19ab1a343847e4be064c15eaf76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP COLUMN "taskId"`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP COLUMN "parentSubtaskId"`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD "owner_task_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD "main_task_id" integer`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD "parent_subtask_id" integer`);
        await queryRunner.query(`ALTER TABLE "main_task" ADD CONSTRAINT "FK_2fc36eb544f93fc76a05a1bf3da" FOREIGN KEY ("owner_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD CONSTRAINT "FK_5b880b82ca0af41e2f2e356fccf" FOREIGN KEY ("main_task_id") REFERENCES "main_task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD CONSTRAINT "FK_3389e4635fe074c4010c788fe0f" FOREIGN KEY ("parent_subtask_id") REFERENCES "subtasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtasks" DROP CONSTRAINT "FK_3389e4635fe074c4010c788fe0f"`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP CONSTRAINT "FK_5b880b82ca0af41e2f2e356fccf"`);
        await queryRunner.query(`ALTER TABLE "main_task" DROP CONSTRAINT "FK_2fc36eb544f93fc76a05a1bf3da"`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP COLUMN "parent_subtask_id"`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP COLUMN "main_task_id"`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP COLUMN "owner_task_id"`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD "parentSubtaskId" integer`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD "taskId" integer`);
        await queryRunner.query(`DROP TABLE "main_task"`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD CONSTRAINT "FK_01cd64f9c2305cc38f9ce62bbfa" FOREIGN KEY ("parentSubtaskId") REFERENCES "subtasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD CONSTRAINT "FK_bde15cf8f7b07bb4ccad8ef6fa3" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
