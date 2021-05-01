import { Router, Request, Response } from 'express';
import FileSystem from '../classes/file-system';
import { FileUpload } from '../interfaces/file-upload';
import { verificaToken2 } from '../middlewares/autenticacion';
import { Dishes } from '../models/dishes.model';//modelo



const dishesRoutes = Router();
const fileSystem = new FileSystem();


//Obtener dishes paginados GET 
dishesRoutes.get('/', async (req: any, res: Response) => {

    //req.query.page leo los parametros opcionales ?page=1
    let page = Number(req.query.page) || 1;

    let skip = page - 1;
    skip = skip * 10;

    //solo me mostrara 3 platos ya que mi limite fijado 
    const dishes = await Dishes.find().sort({ _id: -1 }).skip(skip).limit(10).populate('restaurant', '-password').exec();

    res.json({

        ok: true,
        page,
        dishes
    });



});




//necesito verificar el token d emi restaurante para saber el restaurante q tiene esos platos
//me crea un plato de mi restaurante
dishesRoutes.post('/', [verificaToken2], (req: any, res: Response) => {


    const body = req.body;
    body.restaurant = req.restaurant._id;


    const imagenes = fileSystem.imagenesDeTempHaciaDish(req.restaurant._id);
    //es img xq as esta en nuestro modelo de mongoose
    body.img = imagenes;

    Dishes.create(body).then(async dishesDB => {

        //con esto concatenanemos los valores del restaurante al que pertenecen dichos platos
        await dishesDB.populate('restaurant', '-password').execPopulate();
        res.json({

            ok: true,
            dishes: dishesDB


        });


    }).catch(err => {

        res.json(err);
    })




});


//Servicio para subit archivos en este caso imagenes.Pedimos el token debido a que solo podran subir imagenes
//los restaurantes que esten validados .Por eso el verificaToken2.
dishesRoutes.post('/upload', [verificaToken2], async (req: any, res: Response) => {

    if (!req.files) {

        return res.status(400).json({

            ok: false,
            mensaje: 'No se súbio ningun archivo'

        });

    }

    //objeto de imagen,FileUpload es mi interface

    const file: FileUpload = req.files.img;

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
    };

    //creamos fileSystem para guardas nuestra imagen, lo invocamso
    const fileSystem = new FileSystem();

    await fileSystem.guardarImgTemporal(file, req.restaurant._id);


    res.json({
        ok: true,
        file: file.mimetype
    })
})

//metodo para mostrar nuestras imagenes de la carpeta post , asi el usuario las vera


dishesRoutes.get('/imagen/:restaurantid/:img', (req: any, res: Response) => {

    //mismo nombre que url
    const restaurantId = req.params.restaurantid;
    const img = req.params.img;


    const pathFoto = fileSystem.getFotoUrl(restaurantId, img);

    res.sendFile(pathFoto);

}



)








export default dishesRoutes;