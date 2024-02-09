const mongoose = require('mongoose')

const dbConnection = async()=>{

    try {
        
        mongoose.connect(process.env.MONGODB_CNN)
        console.log('BASE DE DATOS EN LINEA')

    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion de la BD')
    }


}





module.exports = {

    dbConnection

}