/* eslint-disable indent */
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'

// export interface

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  lastname: {
    type: String,
    // required: [true, 'Please provider your username'],
  },
  role: {
    type: String,
    enum: ['user', 'client', 'vendor', 'admin'],
    required: [true, 'Please provider your userRole'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  tokens: {
    type: Array,
  },
},
  {
    timestamps: true,
  })
userSchema.plugin(uniqueValidator)

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user: any = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User: any = mongoose.model('User', userSchema)
export default User

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user: any = this
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_KEY,
    //  {expiresIn: "1m"}
  )

  user.tokens = []
  user.tokens = user.tokens.concat({ token })

  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user: any = await User.findOne({ email })
  if (!user) return false
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) return 'invalid-password'

  return user
}
