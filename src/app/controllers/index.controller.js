import { Movie } from '../models/movie'

/* GET home page. */
export const indexPage = (req, res, next) => {
  Movie.find().exec((err, movies) => {
    res.render('layout', { content: 'index', title: 'Top 10 Movies', movies });
  })
}

// GET about page 
export const aboutPage = (req, res, next) => {
  res.render('layout', { content: 'about', title: 'Top 10 Movies' })
}


// GET contact page 
export const contactPage = (req, res, next) => {
  res.render('layout', { content: 'contact', title: 'Top 10 Movies' })
}
