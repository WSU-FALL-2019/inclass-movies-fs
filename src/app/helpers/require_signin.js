
import jwt from 'jsonwebtoken'
import {APP_SECRET} from '../../config/vars'
export function isSignedIn(req){
    try{
        jwt.verify("", APP_SECRET) //TODO
        return true
    }catch(err){
        return false
    }
}

export function getSignedAuthenticationToken(user, expireOn){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        exp: parseInt(expireOn.getTime() / 1000)
    }, APP_SECRET)
}

export function requireSignIn(req, res, next){
    if(isSignedIn(req)){
        next()
    }else{
        res.status(401).json("Unauthorized request")
        res.end()
    }
}