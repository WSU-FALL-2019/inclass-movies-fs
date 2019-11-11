import express from 'express'
import { toNGPage, indexPage, aboutPage, contactPage } from '../app/controllers/index.controller'
import { allMoviesAPI, oneMovieAPI, createMovieAPI, updateMovieAPI, deleteMovieAPI} from '../app/controllers/movies.controller'
import { requireSignIn, isSignedIn } from '../app/helpers/require_signin'
import { registerUserAPI, signUserInAPI } from '../app/controllers/users.controller'
let router = express.Router()

export function configureRoutes(app){
    app.all('*', (req, res, next) =>{
        app.locals.signedIn = isSignedIn(req)
        next()
    })
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)

    router.get("/movies*", toNGPage)
    router.get("/register", toNGPage)
    router.get("/signin", toNGPage)

    // Movies
    router.get('/api/movies', allMoviesAPI)
    router.get('/api/movies/:id', oneMovieAPI)
    router.post('/api/movies', requireSignIn, createMovieAPI)
    router.put('/api/movies/:id', requireSignIn, updateMovieAPI)
    router.delete('/api/movies/:id', requireSignIn,deleteMovieAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)

    app.use('/', router)
}