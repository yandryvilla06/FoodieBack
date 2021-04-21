"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const restaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name restaurant is required']
    },
    registerDate: {
        type: Date
    },
    avatar: {
        type: String,
        unique: true,
        default: 'user.png'
    },
    address: {
        type: String,
        required: [true, 'Name restaurant is required']
    },
    img: [{
            type: String
        }],
    cif: {
        type: String,
        unique: true,
        required: [true, 'cif restaurant is required']
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: [true, 'category restaurant is required']
    },
    coords: {
        type: String,
        required: [true, 'coord restaurant is required']
    },
    telephone: {
        type: Number,
        unique: true,
        required: [true, 'Phone restaurant is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});
restaurantSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Restaurant = mongoose_1.model('Restaurant', restaurantSchema);
