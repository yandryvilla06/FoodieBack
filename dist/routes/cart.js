"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_model_1 = require("../models/cart.model"); //modelo
const cartRoutes = express_1.Router();
cartRoutes.post('/create', (req, res) => {
    const cart = {
        created: ,
        img: ,
        description: ,
        name: ,
        price: ,
        category: ,
        restaurant: 
    };
    cart_model_1.Cart.create(cart).then(cartDB => {
        res.json({
            ok: true,
            token: cartDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = cartRoutes;
