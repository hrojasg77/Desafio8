
const createKnexClient = require('knex')
const crypto = require('crypto');
const { json } = require('express');

mysqlConfig = {
    client: 'mysql2',
    connection: 'mysql://alumno:contrasenia@localhost:3306/productosymensajes'
}

const port = 8080

const clienteSql = createKnexClient(mysqlConfig);

async function createTableAsync() {
    try {
      const table = await clienteSql.schema.hasTable('productos');
      if (!table) {
        await clienteSql.schema.createTable('productos', table => {
          table.string('id', 30).primary();
          table.string('title', 30);
          table.integer('price', 11);
          table.string('thumbnail', 200);                    
        });
    }
    } catch (error) {
      throw error;
    }
  }

class ProductosApi {
    constructor() {
        createTableAsync();
        this.cliente = clienteSql;
        this.tabla = 'productos';
    }

    async listado() {
        return await this.cliente(this.tabla).select() ;
    }

    async grabar(prod) {
        const uuid = crypto.randomUUID()
        prod.id = uuid;
        await this.cliente(this.tabla).insert(prod);
    }

}

module.exports = ProductosApi
