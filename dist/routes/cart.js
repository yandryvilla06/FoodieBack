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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_model_1 = require("../models/cart.model"); //modelo
const cartRoutes = express_1.Router();
cartRoutes.post('/', (req, res) => {
    const body = req.body;
    body.dishes = req.dishes._id;
    cart_model_1.Cart.create(body).then((cartDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield cartDB.populate('dishes').execPopulate();
        //con esto concatenanemos los valores del restaurante al que pertenecen dichos platos
        res.json({
            ok: true,
            cart: cartDB
        });
    })).catch(err => {
        res.json(err);
    });
});
exports.default = cartRoutes;
