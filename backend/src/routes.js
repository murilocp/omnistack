const express = require('express');
//multer e sua configuração para entender o upload de posts, entendendo o corpo do mesmo
const multer = require('multer');
const uploadConfig = require('./config/upload');

const LikeController = require('./controllers/LikeController');
const PostController = require('./controllers/PostController');

const routes = new express.Router();
const upload = multer(uploadConfig);

//rotas de get e post para meus métodos nos Controllers
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

//o :id representa que pode receber um parametro
routes.post('/posts/:id/like', LikeController.store);


module.exports = routes;