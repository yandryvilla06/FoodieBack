"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken2 = exports.verificaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.comprobarToken(userToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
exports.verificaToken = verificaToken;
const verificaToken2 = (req, res, next) => {
    const restaurantToken = req.get('x-token') || '';
    token_1.default.comprobarToken2(restaurantToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.restaurant = decoded.restaurant;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token2 no es correcto'
        });
    });
};
exports.verificaToken2 = verificaToken2;
