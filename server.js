//Configurando o servidor
const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

//Configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'));

//Habilitar body do fomulário
server.use(express.urlencoded({ extended: true }));

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

//Configurando a templete engine
nunjucks.configure('./', {
    express: server,
    noCache: true,
});


//Lista de doadores
const donators = [
    {
        name: 'Diego Batista',
        blood: 'AB+'
    },

    {
        name: 'Fernando Diego',
        blood: 'B-'
    },

    {
        name: 'Silva Diego',
        blood: 'A+'
    },

    {
        name: 'Batista Fernando',
        blood: 'O+'
    },
];

//Configurar apresentação da página
server.get('/', function(req, res) {
    return res.render('index.html', { donators });
});

//Pegar dados do formulário
server.post('/', function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    const query = `
    INSERT INTO donators ("name", "email", "blood")
    VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {
        if (err) return res.send("Oops! ocorreu um erro no banco de dados.")
        
        return res.redirect("/")
});

//Ligar o servidor na porta 3000
server.listen(3000, function() {
    console.log('Servidor inciado!')
});