import { Injectable } from "@angular/core"
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Movie } from '../models/movie'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  moviesUrl = "/api/movies"
  constructor(private http : HttpClient){}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
  }

  getMovie(id : string) : Observable<Movie> {
    let url = `${this.moviesUrl}/${id}`
    return this.http.get<Movie>(url)
  }

  addMovie(movie : Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, AuthenticationService.httpHeaders())
  }

  updateMovie(movie : Movie) :  Observable<Movie> {
    let url = `${this.moviesUrl}/${movie._id}`
    return this.http.put<Movie>(url, movie, AuthenticationService.httpHeaders())
  }

  deleteMovie(movie : Movie) :  Observable<{}> {
    let url = `${this.moviesUrl}/${movie._id}`
    return this.http.delete(url, AuthenticationService.httpHeaders())
  }
}