import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema

// Person and movie have a many to many relatioinship: 
// A movie can have directed by more that one person and
// one persone can direct more that one movie.
let personSchema = new Schema({
    first_name: String,
    mi: String,
    last_name: String,
    movies: [{type: Schema.Types.ObjectId, ref: "Movie"}]
})

// Movie has a one to many relationship with reviews:
// A movie can have more that one review.
let reviewSchema = new Schema({
    comment: String,
    posted_at: Date
})

let movieSchema = new Schema({
    title: String,
    plot: String,
    poster: String,
    rated: String,
    rating: Number,
    votes: Number,
    genre: String,
    year: Number,
    imbdbID: String,
    directors: [{type: Schema.Types.ObjectId, ref: "Person"}],
    reviews: [ reviewSchema ]
})

export let Person = mongoose.model("Person", personSchema)
export let Movie = mongoose.model("Movie", movieSchema)