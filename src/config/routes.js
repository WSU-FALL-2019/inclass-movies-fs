import express from 'express'
import { indexPage, aboutPage, contactPage } from '../app/controllers/index.controller'
import { allMoviesAPI, oneMovieAPI, createMovieAPI, updateMovieAPI, deleteMovieAPI} from '../app/controllers/movies.controller'
let router = express.Router()

export function configureRoutes(app){
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)

    router.get('/api/movies', allMoviesAPI)
    router.get('/api/movies/:id', oneMovieAPI)
    router.post('/api/movies', createMovieAPI)
    router.put('/api/movies/:id', updateMovieAPI)
    router.delete('/api/movies/:id', deleteMovieAPI)

    app.use('/', router)
}