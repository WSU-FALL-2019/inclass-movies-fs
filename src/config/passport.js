const LocalStrategy = require('passport-local').Strategy
import { User } from '../app/models/user'

export const strategy = new LocalStrategy(
  function (uname, password, done) {
    User.findOne({ username: uname }, (err, user) => {
      if (err) {
        return done(err)
      } else {
        if (!user) {
          return done(null, false, {
            message: "User was not found"
          })
        } else {
          if (!user.isValidPassword(password)) {
            return done(null, false, {
              message: "incorrect password"
            })
          } else {
            return done(null, user)
          }
        }
      }
    })
  }
)
