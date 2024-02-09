

const { Schema, model  } = require('mongoose')


const RoleShema = Schema({
    rol:{
        type:String,
        required:[true, 'El Rol es obligatorio']
    }
});



module.exports = model('Role', RoleShema)