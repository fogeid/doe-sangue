//Configurando o servidor
const express = require('express');
const server = express();

//Configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'));

//Configurando a templete engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
    express: server
});

//Configurar apresentação da página
server.get('/', function(req, res) {
    return res.render("index.html");
});

//Ligar o servidor na porta 3000
server.listen(3000, function() {
    console.log("Servidor inciado!")
});