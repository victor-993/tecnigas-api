const pool = require("./conexion");

const getVenta = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM venta ORDER BY id_venta`);
        res.send(response.rows);
    } catch (e){
        console.error(e);
    }
};


const getLastVenta = async (req, res) => {
    try {
        const response = await pool.query(`SELECT max(id_venta) FROM venta`);
        //console.log(response.rows[0].max);
        //res.send(response.rows[0] == null? {max: 0} :  response.rows[0].max);
        res.send(response.rows[0]);
    } catch (e){
        console.error(e);
    }
};

const getDetallebyId = async (req, res) => {
    const id_venta = req.params.id_venta;
    try {
        const response = await pool.query(
            `SELECT * FROM "detalle venta" WHERE id_venta = ${id_venta} order by id_detaven`
            );
        res.send(response.rows);
    } catch (e) {
        console.error(e);
    }
};

const getDetaPro = async (req, res) => {
    const id_venta = req.params.id_venta;
    const id_producto = req.params.id_producto;
    try {
        const response = await pool.query(
            `SELECT * FROM "detalle venta" WHERE id_venta = ${id_venta} AND producto_id = ${id_producto}`
            );
        res.send(response.rows);
    } catch (e) {
        console.error(e);
    }
};

const postVenta = async (req, res) => {
    try {
      const { cliente_id, usuario_id, fecha_ve, iva, total_iva, sub_total, total_ve, observacion_vta, recibido, cambio, estado_ve } = req.body;
      const response = await pool.query(
        "INSERT INTO venta (cliente_id, usuario_id, fecha_ve, iva, total_iva, sub_total, total_ve, observacion_vta, recibido, cambio, estado_ve) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id_venta",
        [cliente_id, usuario_id, fecha_ve, iva, total_iva, sub_total, total_ve, observacion_vta, recibido, cambio, estado_ve]
      );
      res.send(response.rows[0]);
    } catch (e) {
      console.log(e);
    }
  };

const postDetalleVenta = async (req, res) => {
    try {
      const { id_venta, producto_id, descuento, cantidad_ven, precio_ven, total_ven} = req.body;
      const response = await pool.query(
        `INSERT INTO "detalle venta" (id_venta, producto_id, descuento, cantidad_ven, precio_ven, total_ven) VALUES ($1, $2, $3, $4, $5, $6)`,
        [id_venta, producto_id, descuento, cantidad_ven, precio_ven, total_ven]
      );
      res.send(response.rows[0]);
    } catch (e) {
      console.log(e);
    }
  };

module.exports = {
    getVenta,
    getDetallebyId,
    getDetaPro,
    getLastVenta,
    postVenta,
    postDetalleVenta,
};