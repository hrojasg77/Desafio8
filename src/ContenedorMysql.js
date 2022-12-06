export class ContenedorMysql {
    constructor(clienteMysql, tabla) {
        this.cliente = clienteMysql;
        this.tabla = tabla;
    }

    async guardar(cosa) {
        await this.cliente(this.tabla).insert(cosa);
    }

    async listado() {
        return await this.cliente(this.tabla).select();
    }


}