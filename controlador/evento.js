const pool = require("./conexion");

const postEvento = async (req, res) => {
  try {
    const {
      title,
      start,
      end,
      allDay,
      descripcion,
    } = req.body;
    const response = await pool.query(
      `INSERT INTO evento (title,
        start,
        end,
        allDay,
        descripcion)
       VALUES($1, $2, $3, $4, $5)`,[title,
        start,
        end,
        allDay,
        descripcion]
    );
    console.log("evento agregado con exito");
    res.json("evento agregado con exito");
  } catch (e) {
    console.error(e);
  }
};


const getEvento = async (req, res) => {
  try {
    const response = await pool.query(
      `select * from evento` 
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

const getEventoId = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await pool.query(
      `select * from evento where id = ${id}` 
    );
    res.send(response.rows);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  postEvento,
  getEvento,
  getEventoId,

};