"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_model_1 = require("../models/restaurant.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const restaurantRoutes = express_1.Router();
// Login
restaurantRoutes.post('/login', (req, res) => {
    const body = req.body;
    restaurant_model_1.Restaurant.findOne({ email: body.email }, (err, restaurantDB) => {
        if (err)
            throw err;
        if (!restaurantDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
        if (restaurantDB.compararPassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken2({
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
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***'
            });
        }
    });
});
// Crear un usuario
restaurantRoutes.post('/create', (req, res) => {
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
        password: bcrypt_1.default.hashSync(req.body.password, 10),
    };
    restaurant_model_1.Restaurant.create(restaurant).then(restaurantDB => {
        const tokenRestaurant = token_1.default.getJwtToken2({
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
restaurantRoutes.post('/update', autenticacion_1.verificaToken2, (req, res) => {
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
    };
    restaurant_model_1.Restaurant.findByIdAndUpdate(req.restaurant._id, restaurant, { new: true }, (err, restaurantDB) => {
        if (err)
            throw err;
        if (!restaurantDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenRestaurant = token_1.default.getJwtToken2({
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
restaurantRoutes.get('/', [autenticacion_1.verificaToken2], (req, res) => {
    const restaurant = req.restaurant;
    res.json({
        ok: true,
        restaurant
    });
});
exports.default = restaurantRoutes;
