import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minlenth: 2,
        maxlenth: 50
    },

    email:{
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S/, 'Please enter a valid email'],
    },

    password:{
        type: String,
        required: [true, 'User password is required'],
        minlength: [8, 'User password must be at least 8 characters long']
    },

    role:{
        type: String,
        enum: ['Teacher', 'Student'],
        required: true
    }
},
{ timestamps: true }
);


const User = mongoose.model('User', userSchema);

export default User;