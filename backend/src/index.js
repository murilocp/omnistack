const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//dividir o servidor para aceitar tanto http quanto o socket (real-time)
const server = require('http').Server(app);
const io = require('socket.io')(server);

//configuração da string de conexão com o banco
mongoose.connect('mongodb+srv://semana:semana@cluster0-c9ng3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});


//socket usado para replicar os posts e likes para todos os usuarios online
//declarada essa rota para o req.io ser utilizada por todos os outros métodos/midlleware
//next para evitar que rotas fiquem paradas aqui
app.use((req, res, next) => {
    req.io = io;

    next();
})

//todas as urls podem acessar o backend
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//segundo caminho de rotas
app.use(require('./routes'));

server.listen(3334);
//post no blog rocketseat sobre usar bancos sql no nodejs