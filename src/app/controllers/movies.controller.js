import { Movie } from '../models/movie'

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
      Object.assign(movie, req.body)
      movie.save(err => {
        if(err){
          res.json({success: false, message: "Unable to update the requested movie"})
        }else{
          res.end();
        }
      })
    }
  })
}

export const deleteMovieAPI = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id, err => {
    if(err){
      res.json({success: false, message: "Unable to delete the requested movie"})
    }else{
      res.end();
    }
  })
}