"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const Schema = mongoose_2.default.Schema;
const cartShema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    products: {
        type: [],
    }
});
exports.Cart = mongoose_1.model('Cart', cartShema);
