require('dotenv').config()
const usuarios = require('../routes/user')
const auth = require('../routes/auth')
var cors = require('cors')
const express =require('express') 
const { dbConnection } = require('../database/config')


class Server{

    constructor(){
        this.port = process.env.PORT
        this.app = express()
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        //Conectar DB
        this.conectBD()

        //Middleares
        this.middlewares();
        //Lectura y parse del body
        this.app.use(express.json())
        //Routes
        this.routes();
    }

    async conectBD(){
        await dbConnection();
    }


    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routes(){
       this.app.use(this.usuariosPath, usuarios)
       this.app.use(this.authPath, auth)
    }

    listen(){
        this.app.listen(this.port)
    }
}

module.exports = Server