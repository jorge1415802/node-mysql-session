var express = require('express');
var morgan = require('morgan');
var exphbs = require('express-handlebars');
var path = require('path');
var flash = require('connect-flash');
var session = require('express-session');
var mysql_session = require('express-mysql-session');
var {database} = require('./keys');
var passport = require('passport');


//Inicializaciones
var app = express();
require('./lib/passport');

// configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
  defaultLayout:'main',
  layoutsDir:path.join(app.get('views'),'layouts'),
  partialsDir:path.join(app.get('views'),'partials'),
  extname:'.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine','.hbs');

//Middlewares
app.use(session({
  secret:'nodemysqlRodriguezJorgeLuis2020',
  resave:false,
  saveUninitialized:false,
  store: new mysql_session(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// variables globales
app.use((req,res,next) => {
  app.locals.exito = req.flash('exito');
  app.locals.mensaje = req.flash('mensaje');
  app.locals.user = req.user;
  next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/enlaces',require('./routes/enlaces'));
// public
app.use(express.static(path.join(__dirname,'public')));

// starting server
app.listen(app.get('port'),() => {
  console.log('Server on port: ',app.get('port'));
});
