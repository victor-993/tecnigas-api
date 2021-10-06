const pool = require("./conexion");

const getDevolucion= async (req, res) => {
    try {
      const response = await pool.query(
        `SELECT * FROM devolucion ORDER BY devolucion_id`
      );
      res.send(response.rows);
    } catch (e) {
      console.error(e);
    }
  };

const getDev = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const response = await pool.query(
      `SELECT * FROM devolucion WHERE id_venta = ${id_venta}`
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.error(e);
  }
};

const getDetaDev = async (req, res) => {
  try {
    const devolucion_id = req.params.devolucion_id;
    const producto_id = req.params.producto_id;
    const response = await pool.query(
      `SELECT * FROM "detalle devolucion" WHERE devolucion_id = ${devolucion_id} AND producto_id = ${producto_id}`
    );
    res.send(response.rows[0]);
  } catch (e) {
    console.error(e);
  }
}; 

const postDevolucion = async (req, res) => {
    try {
        const {
          id_venta,
          comentario_dev,
          fecha_dev,
          total_gral_d  
        } = req.body;
        const response = await pool.query(
            `INSERT INTO devolucion(id_venta,comentario_dev,fecha_dev,total_gral_d)
            VALUES(${id_venta},'${comentario_dev}', CAST ('${fecha_dev}' AS DATE) , ${total_gral_d}) RETURNING devolucion_id`
        );
        res.send(response.rows);
    } catch (error) {
      console.error(error);
    }
  };

const postDetaDev = async (req, res) => {
  try {
    const {
      devolucion_id,
      producto_id,
      cantidad_det,
      precio_uni,
      precio_tot
    } = req.body;
    const response = await pool.query(
      `INSERT INTO "detalle devolucion"(devolucion_id, producto_id , cantidad_det , precio_uni , precio_tot)
      VALUES(${devolucion_id}, ${producto_id}, ${cantidad_det}, ${precio_uni}, ${precio_tot})`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const putDevolucion = async (req, res) => {
  try {
    const devolucion_id = req.params.devolucion_id;
    const {
    id_venta,
    comentario_dev,
    fecha_dev,
    total_gral_d
  } = req.body;
    const response = await pool.query(
      `UPDATE devolucion SET id_venta = ${id_venta}, comentario_dev = '${comentario_dev}', fecha_dev = CAST ('${fecha_dev}' AS DATE), 
      total_gral_d = ${total_gral_d} WHERE devolucion_id = ${devolucion_id} RETURNING devolucion_id`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const putDetaDev = async (req, res) => {
  try {
    const devolucion_id = req.params.devolucion_id;
    const producto_id = req.params.producto_id;
    const {
    cantidad_det,
    precio_uni,
    precio_tot
  } = req.body;
    const response = await pool.query(
      `UPDATE "detalle devolucion" SET cantidad_det = ${cantidad_det}, precio_uni = ${precio_uni}, precio_tot = ${precio_tot}
       WHERE devolucion_id = ${devolucion_id} AND producto_id = ${producto_id}`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const getDevoJDetalle = async (req, res) => {
  try{
    const response = await pool.query(
    `select devolucion.devolucion_id, devolucion.id_venta, devolucion.fecha_dev, devolucion.total_gral_d,
    "detalle devolucion".producto_id, "detalle devolucion".cantidad_det, "detalle devolucion".precio_uni,
    producto.codigo_pro, devolucion.comentario_dev, producto.nombre_pro, categoria.nombre_catg
    from devolucion
    inner join "detalle devolucion" on "detalle devolucion".devolucion_id = devolucion.devolucion_id
    inner join producto on producto.producto_id = "detalle devolucion".producto_id
	  inner join categoria on categoria.id_categoria = producto.id_categoria
    order by 
	  devolucion.fecha_dev ASC,
	  devolucion.devolucion_id ASC`
    );
    res.send(response.rows);
  }catch (e) {
    console.error(e);
  }
};

const eliminaDetaDev = async(req, res) => {
  try {
    const devolucion_id = req.params.devolucion_id;
    const producto_id = req.params.producto_id;
    const response = await pool.query(
      `DELETE FROM "detalle devolucion" WHERE devolucion_id = ${devolucion_id} AND producto_id = ${producto_id}`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const getDetaDevById = async(req, res) =>{
  try {
    const devolucion_id = req.params.devolucion_id;
    const response = await pool.query(
      `SELECT * FROM "detalle devolucion" WHERE devolucion_id = ${devolucion_id}`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const deleteDev = async(req, res) =>{
  try {
    const devolucion_id = req.params.devolucion_id;
    const response = await pool.query(
      `DELETE FROM devolucion WHERE devolucion_id = ${devolucion_id}`
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

  module.exports = {
    getDevolucion,
    postDevolucion,
    postDetaDev,
    putDevolucion,
    putDetaDev,
    getDev,
    getDetaDev,
    getDevoJDetalle,
    eliminaDetaDev,
    getDetaDevById,
    deleteDev
  };