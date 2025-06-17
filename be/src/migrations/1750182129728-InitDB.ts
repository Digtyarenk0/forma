import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1750182129728 implements MigrationInterface {
    name = 'InitDB1750182129728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "stars" integer NOT NULL, "forks" integer NOT NULL, "openIssues" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id")); COMMENT ON COLUMN "projects"."name" IS 'Project name'; COMMENT ON COLUMN "projects"."url" IS 'Project URL'; COMMENT ON COLUMN "projects"."stars" IS 'Number of stars'; COMMENT ON COLUMN "projects"."forks" IS 'Number of forks'; COMMENT ON COLUMN "projects"."openIssues" IS 'Number of open issues'; COMMENT ON COLUMN "projects"."createdAt" IS 'Creation date in UTC Unix timestamp format'; COMMENT ON COLUMN "projects"."ownerId" IS 'Project owner'`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
