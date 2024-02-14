
const { generarJWT } = require('../helpers/generar-jwt')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const login = async (req, res = response) => {


    const { correo, password } = req.body


    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                val: false,
                msg: 'Usuario no existe'
            })
        }
        //Verificar si el usuario esta activo 
        if (!usuario.estado) {
            return res.status(400).json({
                val: false,
                msg: 'Usuario inactivo'
            })
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )

        if(!validPassword){
            return res.status(400).json({
                val: false,
                msg: 'Clave incorrecta'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            val: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            val: false,
            msg: 'Algo salio mal hable con el administrador'
        })
    }
}


module.exports = {
    login


}