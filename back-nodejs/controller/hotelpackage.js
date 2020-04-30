const Pool = require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Get Hotel Package
const getHotelPackage = (req, rep) => {
  pool.query('SELECT * FROM hotelpackage ORDER BY name ASC', (error, results) => { //  ORDER BY id ASC
    if (error) {
      throw error;
    }
    return rep.json(results.rows);
  });
};


// Get Hotel Package by ID
const getHotelPackageById = (req, rep) => {
  const id = req.params.id;
  pool.query('SELECT * FROM hotelpackage WHERE id = $1', [id], (error, results) => {
    if (error) { throw error; }
    rep.status(200).json(results.rows);
  });
};

// Create new Hotel Package
const createHotelPackage = (req, rep) => {
  const { name, price, duration, valid_duration, description, img_url } = req.body;
  pool.query('INSERT INTO hotelpackage (name, price, duration, valid_duration, description, img_url) VALUES ($1, $2, $3, $4, $5, $6)', [name, price, duration, valid_duration, description, img_url], (error, results) => {
    if (error) { throw error; }
    rep.status(201).send(`Hotel package added with ID: ${results.insertId}`);
  });
};

// Delete a Hotel Package by id

const deleteHotelPackage = (req, rep) => {
  const id = req.params.id;
  pool.query('DELETE FROM hotelpackage WHERE id = $1', [id], (error, results) => {
    if (error) { throw error; }
    rep.status(200).send(`Hotel package deleted with ID: ${id}`);
  });
};

// Update a Hotel Package
const updateHotelPackage = (req, rep) => {
  console.log(req.params.id);
  const id = req.params.id;
  console.log(req.body);
  const {name, price, duration, valid_duration, description, img_url} = req.body;

  pool.query(
    'UPDATE hotelpackage SET name = $1, price = $2, duration = $3, valid_duration = $4, description = $5, img_url = $6 WHERE id = $7',
    [name, price, duration, valid_duration, description, img_url, id],
    (error) => {
      if (error) { throw error; }
      rep.status(200).send(`Hotel package modified with ID: ${id}`);
    }
  );
};


module.exports = {
  getHotelPackage,
  createHotelPackage,
  getHotelPackageById,
  deleteHotelPackage,
  updateHotelPackage
};