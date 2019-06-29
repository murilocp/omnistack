const Post = require('../models/Post');

module.exports = {

    async store(req, res){
        //req.params é onde guarda os parametros passados via URL, configurados na route
        const post = await Post.findById(req.params.id);

        //toda vez que o método é chamado, adiciona 1 a coluna likes no banco
        post.likes += 1;

        await post.save();

        req.io.emit('like', post);

        return res.json(post);
    }
}