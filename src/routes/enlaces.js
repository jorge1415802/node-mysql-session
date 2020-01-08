var express = require('express');
var router = express.Router();

var db = require('../database');
router.get('/agregar',(req,res) => {
  res.render('enlaces/agregar');
});

router.post('/agregar',async(req,res) => {
  await db.query('INSERT INTO Enlaces set ?',[req.body]);
  req.flash('exito','Enlace agregado correctamente');
  res.redirect('/enlaces');
});

router.get('/',async(req,res) => {
  //var enlaces = await db.query('SELECT Titulo,Url,Descripcion,Fecha_Creacion FROM Enlaces JOIN Posteo using(?) JOIN Usuarios using(?)',[]);
  var enlaces = await db.query('SELECT * FROM Enlaces');
  console.log(req.body);
  console.log(req.user.IdUsuario);
  
  res.render('enlaces/lista',{enlaces});
});

router.get('/borrar/:id',async(req,res) =>{
  await db.query('DELETE FROM Enlaces WHERE IdEnlace = ?',[req.params.id]);
  req.flash('exito','Enlace borrado con correctamente');
  res.redirect('/enlaces');
});

router.get('/editar/:id',async(req,res) => {
  var enlace_edicion = await db.query('SELECT * FROM Enlaces WHERE IdEnlace = ?',[req.params.id])
  console.log(enlace_edicion[0]);
  res.render('enlaces/editar',{enlace_edicion:enlace_edicion[0]});

});

router.post('/editar/:id',async(req,res) => {
  var enlace_modificado = await db.query('UPDATE Enlaces SET ? WHERE IdEnlace = ?',[req.body,req.params.id]);
  req.flash('exito','Enlace modificado correctamente');
  res.redirect('/enlaces');
});
module.exports = router;
