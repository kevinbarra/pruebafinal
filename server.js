import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: 'postgresql://postgres:SpbuCcfZvUjeWVwEbLfZneHNzBGBSLIa@monorail.proxy.rlwy.net:44284/railway',
  ssl: {
    rejectUnauthorized: false // Necesario para SSL, ajusta según tu configuración de seguridad.
  }
});

// Endpoint para productos
app.get('/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving data from PostgreSQL', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orders');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving data from PostgreSQL', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
