import { Document, model } from 'mongoose';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const cartShema = new Schema<ICart>({

    amount: {
        type: Number,
        required: true
    },
    products: {
        type: [],
    }


});


// cartShema.pre<ICart>('save', function (next) {

//     this.date = new Date();
//     next();
// });



interface ICart extends Document {

    amount: number;
    dishes: string;
}

export const Cart = model<ICart>('Cart', cartShema);
