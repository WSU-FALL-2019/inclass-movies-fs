import express from 'express'
import { indexPage, aboutPage, contactPage } from '../app/controllers/index.controller'
import { allMoviesAPI, oneMovieAPI, createMovieAPI, updateMovieAPI, deleteMovieAPI} from '../app/controllers/movies.controller'
import { requireSignIn } from '../app/helpers/require_signin'
import { registerUserAPI, signUserInAPI } from '../app/controllers/users.controller'
let router = express.Router()

export function configureRoutes(app){
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)

    // Movies
    router.get('/api/movies', allMoviesAPI)
    router.get('/api/movies/:id', oneMovieAPI)
    router.post('/api/movies', createMovieAPI)
    router.put('/api/movies/:id', updateMovieAPI)
    router.delete('/api/movies/:id', deleteMovieAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)

    app.use('/', router)
}