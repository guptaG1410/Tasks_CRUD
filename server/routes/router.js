const express = require('express');
const config = require('../db/config');

const router = express.Router();

// REGISTER
router.post('/create', (req, res) => {
  const { name, email, age, mobile, work, add, desc } = req.body;

  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    res.status(406).json('All fields are required');
  }
  try {
    config.query(
      'SELECT * FROM users where email = ?',
      email,
      (err, result) => {
        if (result.length) {
          res.status(404).json('User already exists!');
        } else {
          config.query(
            'INSERT INTO users SET ?',
            { name, email, age, mobile, work, add, desc },
            (err, result) => {
              if (err) console.log(`error : ${err}`);
              else res.status(201).json(req.body);
            }
          );
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET
router.get('/getusers', (req, res) => {
  config.query('SELECT * FROM users', (err, result) => {
    if (!err) res.status(200).json(result);
    else res.status(404).json({ message: 'No data available !' });
  });
});

// DELETE
router.delete('/deleteuser/:id', (req, res) => {
  const { id } = req.params;

  config.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
    if (!err) res.status(200).json(result);
    else res.status(404).json({ message: "error : can't delete" });
  });
});

// GET INDIVIDUAL USER
router.get('/user/:id', (req, res) => {
  const { id } = req.params;

  config.query('SELECT * FROM users where id = ?', id, (err, result) => {
    if (!err) res.status(200).json(result);
    else res.status(404).json({ message: 'Error!!' });
  });
});

// UPDATE
router.patch('/updateuser/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;

  config.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
    if (!err) res.status(200).json(result);
    else res.status(404).json({ message: "Error : Can't update" });
  });
});

module.exports = router;
