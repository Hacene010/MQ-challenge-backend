const textsRouter = require('express').Router();
const { connection } = require('../config');

textsRouter.get('/admin', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT id, tag, txt FROM texts');
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

textsRouter.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT tag, txt FROM texts');
    const results = {};
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const myKey = row.tag;
      const myValue = row.txt;
      results[myKey] = myValue;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

textsRouter.get('/admin/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT tag, txt FROM texts WHERE id = ?';
  const sqlValues = [id];
  try {
    const [results] = await connection.query(sql, sqlValues);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

textsRouter.put('/admin/:id', async (req, res) => {
  const { id } = req.params;
  const { txt } = req.body;
  const sql = 'UPDATE texts SET txt = ? WHERE id = ?';
  const sqlValues = [txt, id];
  try {
    const [results] = await connection.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = textsRouter;
