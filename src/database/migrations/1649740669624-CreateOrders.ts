import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrders1649740669624 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: "orders",
          columns: [
            { name: "id", type: "uuid", isPrimary: true },
            { name: "usersId", type: "uuid", isNullable: false },
            { name: "created_at", type: "timestamp", default: "Now()" },
            { name: "updated_at", type: "timestamp", default: "Now()" },
          ]
        }
      )
    );
    await queryRunner.createTable(
      new Table(
        {
          name: "orders_itens",
          columns: [
            { name: "id", type: "uuid", isPrimary: true },
            { name: "ordersId", type: "uuid", isNullable: false },
            { name: "gamesId", type: "uuid", isNullable: false },
            { name: "created_at", type: "timestamp", default: "Now()" },
            { name: "updated_at", type: "timestamp", default: "Now()" },
          ]
        }
      )
    );

    await queryRunner.createForeignKey("orders",
      new TableForeignKey({
        name: "FK_orders_usersId",
        columnNames: ["usersId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    );

    await queryRunner.createForeignKey("orders_itens",
      new TableForeignKey({
        name: "FK_orders_itens_ordersId",
        columnNames: ["ordersId"],
        referencedColumnNames: ["id"],
        referencedTableName: "orders",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    );

    await queryRunner.createForeignKey("orders_itens",
      new TableForeignKey({
        name: "FK_orders_itens_gamesId",
        columnNames: ["gamesId"],
        referencedColumnNames: ["id"],
        referencedTableName: "games",
        onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      })
    );


  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders", "FK_orders_usersId");
    await queryRunner.dropForeignKey("orders_itens", "FK_orders_itens_ordersId");
    await queryRunner.dropForeignKey("orders_itens", "FK_orders_itens_gamesId");
    await queryRunner.dropTable("orders_itens");
    await queryRunner.dropTable("orders");
  }

}
