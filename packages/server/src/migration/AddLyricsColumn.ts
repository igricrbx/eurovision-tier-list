import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLyricsColumn1633455678912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contestant" ADD "lyrics" text`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contestant" DROP COLUMN "lyrics"`
    );
  }
}
