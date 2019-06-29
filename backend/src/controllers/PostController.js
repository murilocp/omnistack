const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    //async porque leva tempo para finalizar
    //metodo eh middleware
    async index(req, res){
        //o find é o que vai buscar no banco os posts. Sort é para ordenar, onde o '-' representa o DESC do order by
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res){
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;


        //divide a string por pontos e salva respectivamente em name
        const [name] = image.split('.');
        //forma de concatenar as strings sem usar o +
        const fileName = `${name}.jpg`;

        //resize para no maximo 500 px de altura/largura
        //no jpeg o 70 é para % de qualidade
        //toFile salvar no arquivo..
        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        )

        //para excluir imagem original maior
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });
        
        //aqui onde o io replica os posts para todos usuarios assim que o post é criado
        req.io.emit('post', post);

        return res.json({ post });
    }
}