import Server from './classes/server';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/usuario';
import restaurantRoutes from './routes/restaurant';
import dishesRoutes from './routes/dishes';
import fileUpload from 'express-fileupload';



const server = new Server();


// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//FileUpload, subir archivos
server.app.use(fileUpload());

//configurar cors
server.app.use(cors({ origin: true, credentials: true }))


// Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/restaurant', restaurantRoutes);
server.app.use('/dishes', dishesRoutes);


// Conectar DB
mongoose.connect('mongodb://localhost:27017/bd_foodie',
    { useNewUrlParser: true, useCreateIndex: true }, (err) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');
    })

// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});