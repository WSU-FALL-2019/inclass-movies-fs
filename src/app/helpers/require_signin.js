
import jwt from 'jsonwebtoken'
import {APP_SECRET} from '../../config/vars'
export function isSignedIn(req){
    try{
        jwt.verify(req.headers.authorization.split(' ')[1], APP_SECRET) //TODO
        return true
    }catch(err){
        try{
            jwt.verify(req.cookies.token, APP_SECRET)
            return true
        } catch (err){
            return false
        }
    }
}

export function currentUser(req){
    if(req.headers.authorization){
        return jwt.decode(req.headers.authorization.split(' ')[1])
    } else if(req.cookies.token){
        return jwt.decode(req.cookies.token, APP_SECRET)
    }else {
        return null
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