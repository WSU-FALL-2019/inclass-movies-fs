import express from "express"
import { Movie } from '../models/schema'

export let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.find().exec((err, movies) => {
    res.render('layout', { content: 'index', title: 'Top 10 Movies', movies });
  })
});

// GET about page 
router.get('/about', (req, res, next) => {
  res.render('layout', { content: 'about', title: 'Top 10 Movies' })
})


// GET contact page 
router.get('/contact', (req, res, next) => {
  res.render('layout', { content: 'contact', title: 'Top 10 Movies' })
})
