import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEurovisionStages1719493876543 implements MigrationInterface {
    name = 'AddEurovisionStages1719493876543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add stage columns to contestant table
        await queryRunner.query(`ALTER TABLE "contestant" ADD "inFirstSemiFinal" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "contestant" ADD "inSecondSemiFinal" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "contestant" ADD "inGrandFinal" boolean NOT NULL DEFAULT false`);
        
        // Create enum type for stage
        await queryRunner.query(`CREATE TYPE "public"."tier_list_stage_enum" AS ENUM('FIRST_SEMI', 'SECOND_SEMI', 'GRAND_FINAL')`);
        
        // Add stage column to tier_list table
        await queryRunner.query(`ALTER TABLE "tier_list" ADD "stage" "public"."tier_list_stage_enum" NOT NULL DEFAULT 'GRAND_FINAL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove stage column from tier_list table
        await queryRunner.query(`ALTER TABLE "tier_list" DROP COLUMN "stage"`);
        
        // Drop enum type
        await queryRunner.query(`DROP TYPE "public"."tier_list_stage_enum"`);
        
        // Remove stage columns from contestant table
        await queryRunner.query(`ALTER TABLE "contestant" DROP COLUMN "inGrandFinal"`);
        await queryRunner.query(`ALTER TABLE "contestant" DROP COLUMN "inSecondSemiFinal"`);
        await queryRunner.query(`ALTER TABLE "contestant" DROP COLUMN "inFirstSemiFinal"`);
    }
}
