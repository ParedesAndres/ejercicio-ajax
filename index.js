const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.use(express.static('public'));

//registrar motor de render
app.engine('handlebars', hbs());

//setear el motor de render a utilizar
app.set('view engine', 'handlebars');

//importar archivo personas
var personas = require('./personas');
console.log(personas);


//configurar body-parser

//Importar modulo de body-parser
var bodyParser = require('body-parser');
//Configurar modulo de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//usar body-parser
app.use(express.json());

app.get('/', function(request, response){

    var contexto = {
        texto: 'Mi texto de prueba',
        lista: personas,
    }
    response.render('index', contexto);
});

//Ruta agregar

app.post('/agregar', function(request, response){
    personas.push({
        nombre: request.body.nombre,
        edad: request.body.edad,
    });

    console.log(request.body);
    response.send('agregado');
})

app.listen(5500);