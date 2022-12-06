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
      const table = await clienteSql.schema.hasTable('mensajes');
      if (!table) {
        await clienteSql.schema.createTable('mensajes', table => {
          table.string('id', 30).primary();
          table.string('autor', 30);
          table.string('texto', 200);
          table.string('fyh', 30);                    
        });
    }
    } catch (error) {
      throw error;
    }
  }


class mensajes {
    constructor() {
        createTableAsync();
        this.cliente = clienteSql;
        this.tabla = 'mensajes';
    }

    async listado() {
        return await this.cliente(this.tabla).select() ;
    }

    async guardar(prod) {
        const uuid = crypto.randomUUID()
        prod.id = uuid;
        await this.cliente(this.tabla).insert(prod);
    }
}


module.exports = mensajes
