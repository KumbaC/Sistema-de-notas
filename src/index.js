const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');



/* Inicialización  */
const app = express();
require('./database');
require('./config/passport');

/* Configuraciones  */

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs ({
defaultLayout: 'main',
layoutsDir : path.join(app.get('views'), 'layouts'),
partialsDir : path.join(app.get('views') , 'partials'),
runtimeOptions: {                           
        allowProtoPropertiesByDefault: true,
        // allowProtoMethodsByDefault: true

    },


extname: '.hbs'
}));

app.set('view engine', '.hbs');




/* Middlewares  */
app.use(express.urlencoded({extended: false }));
app.use(methodOverride('_method'));
app.use(session ({

secret: 'mysecretapp',
resave: true,
saveUninitialized: true,

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

/* Variables Global */

app.use((req, res, next)=>{ 
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     res.locals.update_msg = req.flash('update_msg');
     res.locals.user = req.user || null;
 next();
});

 

/* Rutas */

app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));



/* Archivos Estaticos */

app.use(express.static(path.join(__dirname, "public")));


/* Server  */

app.listen(app.get('port'), () => {

console.log('Server encendido', app.get('port'));

});