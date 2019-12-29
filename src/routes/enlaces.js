var express = require('express');
var router = express.Router();

var db = require('../database');
router.get('/agregar',(req,res) => {
  res.render('enlaces/agregar');
});

router.post('/agregar',async(req,res) => {
  console.log(req.body);
  await db.query('INSERT INTO Enlaces set ?',[req.body]);
  res.send('Datos recibidos');
});
module.exports = router;
