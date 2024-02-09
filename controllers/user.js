const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')



const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
       
        val: true,
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

  
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();

    res.json({
        val: true,
        usuario
    })
}


const usuariosPut = async (req, res = response) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        val: true,
        usuario
    })

}


const usuariosPatch = (req, res = response) => {
    res.json({
        val: true
    })
}
const usuariosDelete = async (req, res = response) => {

    const {id}= req.params;
    //const usuario = await Usuario.findByIdAndDelete(id)
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false })

    res.json({
        val: true,
        usuario
    })
}



module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete


}