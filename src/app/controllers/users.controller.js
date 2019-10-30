import passport from 'passport'
import { User } from '../models/user'

export const registerUserAPI = (req, res, next) => {
  let user = new User
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.username = req.body.username
  user.email = req.body.email
  user.setPassword(req.body.password)

  user.save( err => {
    if(err){
      res.json({success: false, message: "Unable to register user"})
    }else{
      res.end()
    }
  })
}

export const signUserInAPI = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){
      res.status(404).json(err)
    }else{
      if(user){
        res.json({"token": user.generateJWT()})
      }else{
        res.status(401).json(err)
      }
    }
  })(req, res, next)
}

