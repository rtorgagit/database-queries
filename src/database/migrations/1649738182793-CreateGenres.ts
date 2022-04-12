import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateGenres1649738182793 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: "genres",
          columns: [
            { name: "id", type: "uuid", isPrimary: true },
            { name: "description", type: "varchar" },
            { name: "created_at", type: "timestamp", default: "Now()" },
            { name: "updated_at", type: "timestamp", default: "Now()" },
          ]
        }
      )
    );

    await queryRunner.createTable(
      new Table(
        {
          name: "games_genres",
          columns: [
            { name: "gamesId", type: "uuid", isPrimary: true },
            { name: "genresId", type: "uuid", isPrimary: true }
          ]
        }
      )
    );

    await queryRunner.createIndex("games_genres",
      new TableIndex({
        name: "IDX_games_genres",
        columnNames: ["gamesId"],
      })
    );

    await queryRunner.createIndex("games_genres",
      new TableIndex({
        name: "IDX_genres_games",
        columnNames: ["genresId"],
      })
    );

    await queryRunner.createForeignKey("games_genres",
      new TableForeignKey({
        name: "FK_gamesId",
        columnNames: ["gamesId"],
        referencedColumnNames: ["id"],
        referencedTableName: "games",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    ); await queryRunner.createForeignKey("games_genres",
      new TableForeignKey({
        name: "FK_genresId",
        columnNames: ["genresId"],
        referencedColumnNames: ["id"],
        referencedTableName: "genres",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    );


  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("games_genres", "FK_gamesId");
    await queryRunner.dropForeignKey("games_genres", "FK_genresId");
    await queryRunner.dropIndex("games_genres", "IDX_games_genres");
    await queryRunner.dropIndex("games_genres", "IDX_genres_games");
    await queryRunner.dropTable("games_genres");
    await queryRunner.dropTable("genres");
  }

}
