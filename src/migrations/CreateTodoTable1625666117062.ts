import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodoTable1625666117062 implements MigrationInterface {
  name = 'CreateTodoTable1625666117062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS todo (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        "isCompleted" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMPTZ,
        "deletedAt" TIMESTAMPTZ
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "todo"`);
  }
}
