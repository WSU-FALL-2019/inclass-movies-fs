import { Component, OnInit } from "@angular/core";
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "movie-details-el",
    templateUrl: 'movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit{
    movie$ : Observable<Movie>
    isToConfirmDelete : boolean = false
    constructor(
        private moviesService : MoviesService, 
        private route : ActivatedRoute,
        private router : Router,
        private toastr : ToastrService){}
    ngOnInit(): void {
        this.movie$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => 
                this.moviesService.getMovie(params.get('id'))
            )
        )
    }

    toggleConfirmDelete() : void {
        this.isToConfirmDelete = !this.isToConfirmDelete
    }

    deleteMovie(movie : Movie) : void {
        this.moviesService.deleteMovie(movie).subscribe(data => {
            this.toastr.success("Movie successfull deleted.")
            this.router.navigate(['/movies'])
        }, err => {
            this.toastr.error("Unauthorized to delete")
            this.router.navigate(['/movies'])
        })
    }
    
}