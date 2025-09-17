import mongoose from "mongoose";
import bcrypt from "bcrypt";


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
        minlength: [8, 'User password must be at least 8 characters -long']
    },

    role:{
        type: String,
        enum: ['Teacher', 'Student'],
        required: true
    }
},
{ timestamps: true }
);

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password') || !this.password) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

userSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;