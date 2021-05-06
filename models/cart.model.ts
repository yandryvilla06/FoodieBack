import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

const cartShema = new Schema<ICart>({

    date: {
        type: Date
    },
    amount: {
        type: Number
    },
    dishes: {
        type: Schema.Types.ObjectId,
        ref: "Dishes2",
        required: [true, 'Debe exitir una referencia al usuario comprador']
    }

});


cartShema.pre<ICart>('save', function (next) {

    this.date = new Date();
    next();
});



interface ICart extends Document {

    date: Date;
    amount: number;
    dishes: string;

}

export const Cart = model<ICart>('Cart', cartShema);
