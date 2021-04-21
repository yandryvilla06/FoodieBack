import { Router, Request, Response } from 'express';
import { Restaurant } from '../models/restaurant.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken2 } from '../middlewares/autenticacion';


const restaurantRoutes = Router();


// Login
restaurantRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    Restaurant.findOne({ email: body.email }, (err: any, restaurantDB: any) => {

        if (err) throw err;

        if (!restaurantDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if (restaurantDB.compararPassword(body.password)) {

            const tokenUser = Token.getJwtToken2({
                _id: restaurantDB._id,
                name: restaurantDB.name,
                avatar: restaurantDB.avatar,
                address: restaurantDB.address,
                img: restaurantDB.img,
                cif: restaurantDB.cif,
                description: restaurantDB.description,
                category: restaurantDB.category,
                coords: restaurantDB.coords,
                telephone: restaurantDB.telephone,
                email: restaurantDB.email,
            });

            res.json({
                ok: true,
                token: tokenUser
            });

        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***'
            });
        }


    })


});



// Crear un usuario
restaurantRoutes.post('/create', (req: Request, res: Response) => {

    const restaurant = {
        name: req.body.name,
        avatar: req.body.avatar,
        address: req.body.address,
        img: req.body.img,
        cif: req.body.cif,
        description: req.body.description,
        category: req.body.category,
        coords: req.body.category,
        telephone: req.body.telephone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    };

    Restaurant.create(restaurant).then(restaurantDB => {

        const tokenRestaurant = Token.getJwtToken2({
            _id: restaurantDB._id,
            name: restaurantDB.name,
            avatar: restaurantDB.avatar,
            address: restaurantDB.address,
            img: restaurantDB.img,
            cif: restaurantDB.cif,
            description: restaurantDB.description,
            category: restaurantDB.category,
            coords: restaurantDB.coords,
            telephone: restaurantDB.telephone,
            email: restaurantDB.email,
        });

        res.json({
            ok: true,
            token: tokenRestaurant
        });


    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });




});


// Actualizar usuario
restaurantRoutes.post('/update', verificaToken2, (req: any, res: Response) => {

    const restaurant = {
        name: req.body.name || req.restaurant.name,
        avatar: req.body.avatar || req.restaurant.name,
        address: req.body.address || req.restaurant.address,
        img: req.body.img || req.restaurant.img,
        cif: req.body.cif || req.restaurant.cif,
        description: req.body.description || req.restaurant.description,
        category: req.body.category || req.restaurant.category,
        coords: req.body.coords || req.restaurant.coords,
        telephone: req.body.telephone || req.restaurant.telephone,
        email: req.body.email || req.restaurant.email
    }

    Restaurant.findByIdAndUpdate(req.restaurant._id, restaurant, { new: true }, (err, restaurantDB) => {

        if (err) throw err;

        if (!restaurantDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenRestaurant = Token.getJwtToken2({
            _id: restaurantDB._id,
            name: restaurantDB.name,
            avatar: restaurantDB.avatar,
            address: restaurantDB.address,
            img: restaurantDB.img,
            cif: restaurantDB.cif,
            description: restaurantDB.description,
            category: restaurantDB.category,
            coords: restaurantDB.coords,
            telephone: restaurantDB.telephone,
            email: restaurantDB.email,

        });

        res.json({
            ok: true,
            token: tokenRestaurant
        });


    });

});



restaurantRoutes.get('/', [verificaToken2], (req: any, res: Response) => {

    const restaurant = req.restaurant;

    res.json({
        ok: true,
        restaurant
    });

});


export default restaurantRoutes;