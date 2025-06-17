import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1750189775959 implements MigrationInterface {
    name = 'InitDB1750189775959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "repOwner" character varying DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."repOwner" IS 'Owner repository'`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "error" character varying DEFAULT ''`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."error" IS 'Parsing error message'`);
        await queryRunner.query(`ALTER TYPE "public"."projects_status_enum" RENAME TO "projects_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('quenue', 'parsing', 'failed', 'parsed')`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "status" TYPE "public"."projects_status_enum" USING "status"::"text"::"public"."projects_status_enum"`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'quenue'`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum_old" AS ENUM('quenue', 'parsing', 'parsed')`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "status" TYPE "public"."projects_status_enum_old" USING "status"::"text"::"public"."projects_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'quenue'`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."projects_status_enum_old" RENAME TO "projects_status_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."error" IS 'Parsing error message'`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "error"`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."repOwner" IS 'Owner repository'`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "repOwner"`);
    }

}
