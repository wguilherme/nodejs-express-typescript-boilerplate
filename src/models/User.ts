import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
   },
   email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Please provide your email'],

      validate: [validator.isEmail, 'Please provide a valid email']
   },
   password: {
      type: String,
      required: true,
      minLength: 3,
      default: 123,
   },

   role: {
      type: String,
      lowercase: true,
      required: [false, 'Please provide a user role'],
      enum: ['admin', 'provider', 'vendor', 'forwarder', 'client']
   },
},
   {
      timestamps: true,
      // strict: false
   },

);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
export default User;