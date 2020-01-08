var express = require('express');
var router = express.Router();
var passport = require('passport');
var {isLoggedIn} = require('../lib/seguridad');

router.get('/registrarse',(req,res) =>{
  res.render('auditorias/registro');
});



router.post('/registrarse',passport.authenticate('registro.local',{
  successRedirect: '/perfil',
  failureRedirect: 'registrarse',
  failureFlash: true
}));


router.get('/login',(req,res) =>{
  res.render('auditorias/login');
});

router.post('/login',(req,res,next) =>{
  passport.authenticate('login.local',{
    successRedirect:'/perfil',
    failureRedirect:'/login',
    failureFlash: true
  })(req,res,next);
});

router.get('/logout',(req,res) =>{
  req.logOut();
  res.redirect('/login');
})

router.get('/perfil',isLoggedIn,(req,res)=>{
  res.render('perfil');
})
module.exports = router;
