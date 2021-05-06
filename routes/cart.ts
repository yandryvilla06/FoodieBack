import { Router, Request, Response } from 'express';
import { verificaToken, verificaToken2 } from '../middlewares/autenticacion';
import { Cart } from '../models/cart.model';//modelo

const cartRoutes = Router();


cartRoutes.post('/', (req: any, res: Response) => {

    const body = req.body;

    body.dishes = req.dishes._id;


    Cart.create(body).then(async cartDB => {

        await cartDB.populate('dishes').execPopulate();
        //con esto concatenanemos los valores del restaurante al que pertenecen dichos platos
        res.json({

            ok: true,
            cart: cartDB
        });

    }).catch(err => {

        res.json(err);
    })

});

export default cartRoutes;