import { router as indexController} from '../app/controllers/index.controller'

export function configureRoutes(app){
    app.use('/', indexController)
}