var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../database');
var helpers = require('../lib/helpers');

passport.use('login.local',new LocalStrategy({
  usernameField:'usuario',
  passwordField:'contraseña',
  passReqToCallback:true
},async(req,usuario,contraseña,done) => {
  console.log(req.body);
  var filas = await db.query('SELECT * FROM Usuarios WHERE Usuario = ?',[usuario]);
  if(filas.length > 0){
    var usuario_valor = filas[0];
    var contraseña_valida = await helpers.compara_contraseña(contraseña,usuario_valor.Contraseña);
    if(contraseña_valida) {
      done(null,usuario_valor,req.flash('exito','Te has logueado correctamente ' + usuario_valor.Usuario));
    }
    else {
      done(null,false,req.flash('mensaje','Tu usuario o contraseña no coinciden'));
    }
  }
  else {
    return done(null,false,req.flash('mensaje','Necesitas estar registrado para loguearte'));
  }
}));

passport.use('registro.local',new LocalStrategy({
  usernameField:'usuario',
  passwordField:'contraseña',
  passReqToCallback:true
},async(req, usuario, contraseña, done) =>{
  var {nombre} = req.body;
  var NewUsuario = {
    usuario,
    contraseña,
    nombre
  };
  NewUsuario.contraseña = await helpers.encriptado_contraseña(contraseña);
  var resultado = await db.query('INSERT INTO Usuarios SET ?',[NewUsuario]);
  NewUsuario.IdUsuario = resultado.insertId;
  console.log(NewUsuario.IdUsuario);
  return done(null,NewUsuario);
}));

passport.serializeUser((usuario,done) => {
  done(null,usuario.IdUsuario);
});

passport.deserializeUser(async(id,done) =>{
  var consulta = await db.query('SELECT * FROM Usuarios WHERE IdUsuario = ?',[id]);
  done(null,consulta[0]);
});
