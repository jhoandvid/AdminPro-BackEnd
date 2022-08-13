const { v4: uuidv4 } = require('uuid');
const path = require('path')

const subirArchivo = (file, extensionValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = "") => {

    return new Promise((resolve, reject) => {

        const { imagen } = file;

        const nombreCorto = imagen.name.split('.');

        const extension = nombreCorto[nombreCorto.length - 1];

        //Validar extensión
        if (!extensionValidas.includes(extension)) {
            return reject(`La extensión ${extension} es incorrecta - ${extensionValidas}`)
        }

        const nombreArchivo = uuidv4() + '.' + extension

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreArchivo);

        imagen.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }

            resolve([uploadPath, nombreArchivo]);
        })
    })


}

module.exports = {
    subirArchivo
}