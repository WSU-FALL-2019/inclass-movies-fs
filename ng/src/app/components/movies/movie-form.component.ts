import { Component, OnInit } from "@angular/core";
import { Movie } from '../../models/movie';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { rangeValidator } from '../../validators/range.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'movie-form.component.html'
})
export class MovieFormComponent implements OnInit {
    constructor(
        private moviesService: MoviesService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private toastr: ToastrService) { }
    
    movieExists: boolean = false
    movieForm: FormGroup
    ngOnInit(): void {
        this.movieForm = this.fb.group({
            _id: [null],
            title: [null, Validators.required],
            year: [2019, [Validators.required, Validators.min(1900), Validators.max(2020)]],
            rated: [null, Validators.required],
            genre: [null, Validators.required],
            plot: [null, Validators.required],
            poster: [null, [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
            rating: [0.0, [Validators.pattern(/^1?\d(\.\d\d?)?$/), rangeValidator(0, 10)]],
            votes: [0, Validators.pattern(/^\d+$/)],
            imdbID: [null, Validators.required]
        })
        let mid = this.route.snapshot.params['id']
        if (mid !== undefined) {
            this.movieExists = true
            this.moviesService.getMovie(mid).subscribe(m => this.movieForm.setValue(m))
        }
    }

    submitForm(f: NgForm): void {
        console.log("submitted")
        if (f.valid) {
            const movie : Movie = Object.assign({}, this.movieForm.value)
            if (this.movieExists) {
                this.moviesService.updateMovie(movie).subscribe(data => {
                    this.toastr.success("Movie updated successfully")
                    this.router.navigate(['/movies'])
                })

            } else {
                this.moviesService.addMovie(movie).subscribe(data => {
                    this.toastr.success("Movie added successfully")
                    this.router.navigate(['/movies'])
                })
            }
        }

    }

    get imdbID() { return this.movieForm.get('imdbID') }
    get year() { return this.movieForm.get('year') }
    get rated() { return this.movieForm.get('rated') }
    get genre() { return this.movieForm.get('genre') }
    get rating() { return this.movieForm.get('rating') }
    get votes() { return this.movieForm.get('votes') }
    get title() { return this.movieForm.get('title') }
    get poster() { return this.movieForm.get('poster') }
    get plot() { return this.movieForm.get('plot') }

}