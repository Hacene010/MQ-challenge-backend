const linksRouter = require('express').Router();
const { connection } = require('../config');

linksRouter.get('/admin', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT id, tag, link FROM links');
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

linksRouter.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT tag, link FROM links');
    const results = {};
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const myKey = row.tag;
      const myValue = row.link;
      results[myKey] = myValue;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

linksRouter.get('/admin/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT tag, link FROM links WHERE id = ?';
  const sqlValues = [id];
  try {
    const [results] = await connection.query(sql, sqlValues);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

linksRouter.put('/admin/:id', async (req, res) => {
  const { id } = req.params;
  const { link } = req.body;
  const sql = 'UPDATE links SET link = ? WHERE id = ?';
  const sqlValues = [link, id];
  try {
    const [results] = await connection.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = linksRouter;
