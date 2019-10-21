import { Component, OnInit } from "@angular/core";
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';

@Component({
    selector: "movies-el",
    templateUrl: "movies.component.html"
})
export class MoviesComponent implements OnInit {
    constructor(private moviesService : MoviesService){}
    movies : Movie[]

    ngOnInit(): void {
        this.moviesService.getMovies().subscribe( data => this.movies = data)
    }

    sortMovies() : void {
        console.log("Sorting: TODO")
    }
}