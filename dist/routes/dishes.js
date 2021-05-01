"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_system_1 = __importDefault(require("../classes/file-system"));
const autenticacion_1 = require("../middlewares/autenticacion");
const dishes_model_1 = require("../models/dishes.model"); //modelo
const dishesRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
//Obtener dishes paginados GET 
dishesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //req.query.page leo los parametros opcionales ?page=1
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * 10;
    //solo me mostrara 3 platos ya que mi limite fijado 
    const dishes = yield dishes_model_1.Dishes.find().sort({ _id: -1 }).skip(skip).limit(10).populate('restaurant', '-password').exec();
    res.json({
        ok: true,
        page,
        dishes
    });
}));
//necesito verificar el token d emi restaurante para saber el restaurante q tiene esos platos
//me crea un plato de mi restaurante
dishesRoutes.post('/', [autenticacion_1.verificaToken2], (req, res) => {
    const body = req.body;
    body.restaurant = req.restaurant._id;
    const imagenes = fileSystem.imagenesDeTempHaciaDish(req.restaurant._id);
    //es img xq as esta en nuestro modelo de mongoose
    body.img = imagenes;
    dishes_model_1.Dishes.create(body).then((dishesDB) => __awaiter(void 0, void 0, void 0, function* () {
        //con esto concatenanemos los valores del restaurante al que pertenecen dichos platos
        yield dishesDB.populate('restaurant', '-password').execPopulate();
        res.json({
            ok: true,
            dishes: dishesDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//Servicio para subit archivos en este caso imagenes.Pedimos el token debido a que solo podran subir imagenes
//los restaurantes que esten validados .Por eso el verificaToken2.
dishesRoutes.post('/upload', [autenticacion_1.verificaToken2], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se súbio ningun archivo'
        });
    }
    //objeto de imagen,FileUpload es mi interface
    const file = req.files.img;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se súbio ningun archivo en img (carpeta) que es de mimetype'
        });
    }
    //TENDRIAMOS QUE VALIDAR POR SI NOS QUIEREN COLAR MIERDA
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se súbio ningun archivo img'
        });
    }
    ;
    //creamos fileSystem para guardas nuestra imagen, lo invocamso
    const fileSystem = new file_system_1.default();
    yield fileSystem.guardarImgTemporal(file, req.restaurant._id);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
//metodo para mostrar nuestras imagenes de la carpeta post , asi el usuario las vera
dishesRoutes.get('/imagen/:restaurantid/:img', (req, res) => {
    //mismo nombre que url
    const restaurantId = req.params.restaurantid;
    const img = req.params.img;
    const pathFoto = fileSystem.getFotoUrl(restaurantId, img);
    res.sendFile(pathFoto);
});
exports.default = dishesRoutes;
