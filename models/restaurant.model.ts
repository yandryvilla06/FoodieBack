import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


const restaurantSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name restaurant is required']
    },

    registerDate: {
        type: Date
    },

    avatar: [{
        type: String,
    }],

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


restaurantSchema.method('compararPassword', function (password: string = ''): boolean {

    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }

});



interface IRestaurant extends Document {
    name: string;
    registerDate: Date;
    avatar: string;
    address: string;
    img: string[];
    cif: string;
    description: string;
    category: string;
    coords: string;
    telephone: string
    email: string;
    password: string;


    compararPassword(password: string): boolean;
}



export const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);
