import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1750183771006 implements MigrationInterface {
    name = 'InitDB1750183771006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('quenue', 'parsing', 'parsed')`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "status" "public"."projects_status_enum" NOT NULL DEFAULT 'quenue'`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."status" IS 'Project name'`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "stars" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "stars" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "forks" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "forks" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "openIssues" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "openIssues" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "ownerId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."ownerId" IS 'Relation to user'`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."ownerId" IS 'Project owner'`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "ownerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "openIssues" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "openIssues" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "forks" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "forks" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "stars" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "stars" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`COMMENT ON COLUMN "projects"."status" IS 'Project name'`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
    }

}
