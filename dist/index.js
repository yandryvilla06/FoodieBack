"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const dishes_1 = __importDefault(require("./routes/dishes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload, subir archivos
server.app.use(express_fileupload_1.default());
//configurar cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/restaurant', restaurant_1.default);
server.app.use('/dishes', dishes_1.default);
// Conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/bd_foodie', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
