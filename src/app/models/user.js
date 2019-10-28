import mongoose from 'mongoose'
import crypto from 'crypto'

const Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    hash: String,
    salt: String
})

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.isValidPassword = function(password){
    let hash = crypto.pbdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash
}

export let User = mongoose.model("User", userSchema)