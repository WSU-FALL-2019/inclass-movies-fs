import { Routes } from '@angular/router'
import { MoviesComponent } from './components/movies/movies.component'
import { MovieDetailsComponent } from './components/movies/movie-details.component';
import { MovieFormComponent } from './components/movies/movie-form.component';

export const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/new', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailsComponent},
  { path: 'movies/:id/edit', component: MovieFormComponent},
  { path: '', redirectTo: '/movies', pathMatch: 'full' }
]