import { Movie } from '../models/schema'

export const allMoviesAPI = (req, res, next) => {
  Movie.find().select('-directors').exec((err, movies) => {
    if(err){
      res.json({success: false, message: "Failed query"})
    }else{
      res.write(JSON.stringify(movies))
      res.end();
    }
  })
}

export const oneMovieAPI = (req, res, next) => {
  Movie.findOne({_id: req.params.id}).select('-directors').exec((err, movie) => {
    if(err){
      res.json({success: false, message: "Failed query"})
    }else{
      res.write(JSON.stringify(movie))
      res.end()
    }
  })
}

export const createMovieAPI = (req, res, next) => {

} 

export const updateMovieAPI = (req, res, next) => {

}

export const deleteMovieAPI = (req, res, next) => {

}