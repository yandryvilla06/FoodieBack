"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartShema = new mongoose_1.Schema({
    date: {
        type: Date
    },
    amount: {
        type: Number
    },
    dishes: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Dishes2",
        required: [true, 'Debe exitir una referencia al usuario comprador']
    }
});
cartShema.pre('save', function (next) {
    this.date = new Date();
    next();
});
exports.Cart = mongoose_1.model('Cart', cartShema);
