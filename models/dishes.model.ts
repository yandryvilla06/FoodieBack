import { Schema, Document, model } from 'mongoose';


const dishesShema = new Schema<IDishes>({

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
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, 'Debe exitir una referencia al restaurante']
    }



});
const dishes2Shema = new Schema<IDishes2>({

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


});


dishesShema.pre<IDishes>('save', function (next) {

    this.created = new Date();
    next();
});

dishes2Shema.pre<IDishes>('save', function (next) {

    this.created = new Date();
    next();
});


interface IDishes extends Document {

    created: Date;
    img: string[];
    description: string;
    name: string;
    price: number;
    restaurant: string;
    category: string;

}

interface IDishes2 extends Document {

    created: Date;
    img: string[];
    description: string;
    name: string;
    price: number;
    category: string;

}


export const Dishes = model<IDishes>('Dishes', dishesShema);
export const Dishes2 = model<IDishes2>('Dishes2', dishes2Shema);