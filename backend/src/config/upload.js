const multer = require('multer');
const path = require('path');

module.exports = {
    //configurar o diretório para salvar as imagens e pegar o nome original da mesma
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }

    })
}