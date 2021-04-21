import { FileUpload } from "../interfaces/file-upload";
import fs from 'fs'; //file system
import path from 'path';
import uniqid from 'uniqid';

export default class FileSystem {


    constructor() { };

    //Funcion:la cual crearemos carpetas con el nombre de nuestro id_restaurant, asi evitamos carpetas duplicadas y estaran todas en una carpeta temporal.
    //Cuando hagamos un post en dish/uploads se subiran a MongoDB es decir nuestra BD


    guardarImgTemporal(file: FileUpload, restaurantId: string) {

        //me libro del callback del file.mv
        return new Promise((resolve, reject) => {

            //creacion carpetas
            const path = this.crearCarpetaRestaurant(restaurantId);
            //nombre de archivo imagen

            const nombreArchivo = this.generarNombreUnico(file.name);

            //Mover el archivo del dist/uploads/temp

            file.mv(`${path}/${nombreArchivo}`, (err: any, a: void) => {//es un callback 

                if (err) {
                    //no se movio
                    reject(err);
                } else {

                    resolve(a);
                }


            });


        });


    };

    private generarNombreUnico(nombreOriginal: string) {

        const nombreArr = nombreOriginal.split('.');
        //se resta -1 xq en javascript esta en base a 0 
        const extension = nombreArr[nombreArr.length - 1];

        //instalamos paquete uniqid , me genera nombre unicos 

        const idUnico = uniqid();//me genera id unico para mi fichero img

        return `${idUnico}.${extension}`;
    }


    private crearCarpetaRestaurant(restaurantId: string) {

        //__dirname : Me dice mi carpeta raiz en este caso seria Classes , por eso salimos con (../)
        const pathRestaurant = path.resolve(__dirname, '../uploads/', restaurantId);
        const pathRestaurantTemp = path.resolve(pathRestaurant + '/temp');//es para verificar por si es la primera vez que el user sube una img



        const existe = fs.existsSync(pathRestaurant);

        if (!existe) {

            //crea carpeta
            fs.mkdirSync(pathRestaurant, { recursive: true });
            fs.mkdirSync(pathRestaurantTemp, { recursive: true });

        }

        return pathRestaurantTemp;

    }

    imagenesDeTempHaciaDish(restaurantId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', restaurantId, 'temp');
        const pathDish = path.resolve(__dirname, '../uploads/', restaurantId, 'posts');

        if (!fs.existsSync(pathTemp)) {

            return [];
        }

        //si no existe la creo
        if (!fs.existsSync(pathDish)) {

            fs.mkdirSync(pathDish);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(restaurantId);

        imagenesTemp.forEach(img => {

            fs.renameSync(`${pathTemp}/${img}`, `${pathDish}/${img}`)

        })


        return imagenesTemp;





    }


    private obtenerImagenesEnTemp(restaurantId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', restaurantId, 'temp');

        //si existen tengo arreglo de img , si no arreglo vacio
        return fs.readdirSync(pathTemp) || [];

    }


    getFotoUrl(restaurantId: string, img: string) {

        const pathFoto = path.resolve(__dirname, '../uploads', restaurantId, 'posts', img);


        return pathFoto;


    }


}








