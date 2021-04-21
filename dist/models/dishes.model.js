"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dishes = void 0;
const mongoose_1 = require("mongoose");
const dishesShema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    img: [{
        type: String,
        required: [true, 'Img  dishes is required']
    }],
    description: {
        type: String,
        required: [true, 'Description  dishes is required']
    },
    name: {
        type: String,
        required: [true, 'Name dishes is required']
    },
    price: {
        type: Number,
        required: [true, 'Price dishes is required']
    },
    category: {
        type: String
    },
    //es una pequeña relacion por asi llamarlo con restaurantes 
    restaurant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, 'Debee exitir una referencia al restaurante de Yandrisito']
    }
});
dishesShema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Dishes = mongoose_1.model('Dishes', dishesShema);
