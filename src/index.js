var express = require('express');
var morgan = require('morgan');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// variables globales
app.use((req,res,next) => {
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
