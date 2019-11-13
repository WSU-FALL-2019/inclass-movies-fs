import { Movie } from '../models/movie'
import { currentUser } from '../helpers/require_signin'
export const allMoviesAPI = (req, res, next) => {
  Movie.find().select('-directors -__v -reviews').exec((err, movies) => {
    if(err){
      res.json({success: false, message: "Failed query"})
    }else{
      res.write(JSON.stringify(movies))
      res.end()
    }
  })
}

export const oneMovieAPI = (req, res, next) => {
  Movie.findOne({_id: req.params.id}).select('-directors -__v -reviews').exec((err, movie) => {
    if(err){
      res.json({success: false, message: "Failed query"})
    }else{
      res.write(JSON.stringify(movie))
      res.end()
    }
  })
}

export const createMovieAPI = (req, res, next) => {
  let movie = new Movie(req.body)
  movie.user = currentUser(req)._id
  movie.save(err => {
    if(err){
      res.json({success: false, message: "Unable to add movie"})
    }else{
      res.end()
    }
  })
} 

export const updateMovieAPI = (req, res, next) => {
  Movie.findOne({_id: req.params.id}).select('-directors').exec((err, movie) => {
    if(err){
      res.json({success: false, message: "Unable to find the requested movie"})
    }else{
      if(movie.user == currentUser(req)._id){
        Object.assign(movie, req.body)
        movie.save(err => {
          if(err){
            res.json({success: false, message: "Unable to update the requested movie"})
          }else{
            res.end();
          }
        })
      } else {
        res.status(401).json({success: false, message: "Unauthorized to update"})
      }
    }
  })
}

export const deleteMovieAPI = (req, res, next) => {
  Movie.findOne({_id: req.params.id}).exec((err, movie) => {
    if(err){
      res.json({success: false, message: "Unable to find the requested movie"})
    }else{
      if(movie.user == currentUser(req)._id){
        Movie.findByIdAndRemove(req.params.id, err => {
          if(err){
            res.json({success: false, message: "Unable to delete the requested movie"})
          }else{
            res.end();
          }
        })
      } else {
        res.status(401).json({success: false, message: "Unauthorized to delete"})
      }
    }
  })
}