const { response } = require('express')


const usuariosGet = (req, res = response) => {

    res.json({
        val: true
    })
}

const usuariosPost = (req, res = response) => { 

    const {nombre, email }  = req.body

     res.json({
        val: true,
        nombre,
        email
    })
}
const usuariosPut = (req, res = response) => { 
    
    const {id} = req.params

     res.json({
        val: true,
        id
    })
}
const usuariosPatch = (req, res = response) => { 
     res.json({
        val: true
    })
}
const usuariosDelete = (req, res = response) => { 
     res.json({
        val: true
    })
}



module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete


}