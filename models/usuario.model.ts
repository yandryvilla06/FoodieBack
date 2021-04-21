
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    surname: {
        type: String,
        required: [true, 'Surname is required']
    },

    nickname: {
        type: String,
        unique: true,
    },

    avatar: {

        type: String,
        unique: true,
        default: 'user.png'
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


usuarioSchema.method('compararPassword', function (password: string = ''): boolean {

    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }

});



interface IUsuario extends Document {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    avatar: string;


    compararPassword(password: string): boolean;
}



export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
