import { Component, OnInit } from "@angular/core";
import { Movie } from '../models/movie';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
    templateUrl: 'movie-form.component.html'
})
export class MovieFormComponent implements OnInit{
    constructor(
        private moviesService: MoviesService, 
        private route : ActivatedRoute,
        private router : Router){}
    movie: Movie = new Movie
    movieExists : boolean = false

    ngOnInit(): void {
        let mid = this.route.snapshot.params['id']
        if(mid !== undefined){
            this.movieExists = true
            this.moviesService.getMovie(mid).subscribe(m => Object.assign(this.movie, m))
        }
    }

    submitForm() : void{
        this.moviesService.addMovie(this.movie).subscribe(data => {
            this.router.navigate(['/movies'])
        })
        
    }
}