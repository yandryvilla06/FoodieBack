"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs")); //file system
const path_1 = __importDefault(require("path"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    //Funcion:la cual crearemos carpetas con el nombre de nuestro id_restaurant, asi evitamos carpetas duplicadas y estaran todas en una carpeta temporal.
    //Cuando hagamos un post en dish/uploads se subiran a MongoDB es decir nuestra BD
    guardarImgTemporal(file, restaurantId) {
        //me libro del callback del file.mv
        return new Promise((resolve, reject) => {
            //creacion carpetas
            const path = this.crearCarpetaRestaurant(restaurantId);
            //nombre de archivo imagen
            const nombreArchivo = this.generarNombreUnico(file.name);
            //Mover el archivo del dist/uploads/temp
            file.mv(`${path}/${nombreArchivo}`, (err, a) => {
                if (err) {
                    //no se movio
                    reject(err);
                }
                else {
                    resolve(a);
                }
            });
        });
    }
    ;
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        //se resta -1 xq en javascript esta en base a 0 
        const extension = nombreArr[nombreArr.length - 1];
        //instalamos paquete uniqid , me genera nombre unicos 
        const idUnico = uniqid_1.default(); //me genera id unico para mi fichero img
        return `${idUnico}.${extension}`;
    }
    crearCarpetaRestaurant(restaurantId) {
        //__dirname : Me dice mi carpeta raiz en este caso seria Classes , por eso salimos con (../)
        const pathRestaurant = path_1.default.resolve(__dirname, '../uploads/', restaurantId);
        const pathRestaurantTemp = path_1.default.resolve(pathRestaurant + '/temp'); //es para verificar por si es la primera vez que el user sube una img
        const existe = fs_1.default.existsSync(pathRestaurant);
        if (!existe) {
            //crea carpeta
            fs_1.default.mkdirSync(pathRestaurant, { recursive: true });
            fs_1.default.mkdirSync(pathRestaurantTemp, { recursive: true });
        }
        return pathRestaurantTemp;
    }
    imagenesDeTempHaciaDish(restaurantId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', restaurantId, 'temp');
        const pathDish = path_1.default.resolve(__dirname, '../uploads/', restaurantId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        //si no existe la creo
        if (!fs_1.default.existsSync(pathDish)) {
            fs_1.default.mkdirSync(pathDish);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(restaurantId);
        imagenesTemp.forEach(img => {
            fs_1.default.renameSync(`${pathTemp}/${img}`, `${pathDish}/${img}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(restaurantId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', restaurantId, 'temp');
        //si existen tengo arreglo de img , si no arreglo vacio
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(restaurantId, img) {
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', restaurantId, 'posts', img);
        return pathFoto;
    }
}
exports.default = FileSystem;
