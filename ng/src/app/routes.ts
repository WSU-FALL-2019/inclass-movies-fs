import { Routes } from '@angular/router'
import { MoviesComponent } from './components/movies/movies.component'
import { MovieDetailsComponent } from './components/movies/movie-details.component';
import { MovieFormComponent } from './components/movies/movie-form.component';
import { RegisterFormComponent } from './components/users/register-form.component';
import { SignInFormComponent } from './components/users/signin-form.component';
import { AuthenticationGuard } from './services/authentication.guard';

export const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/new', component: MovieFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'movies/:id', component: MovieDetailsComponent},
  { path: 'movies/:id/edit', component: MovieFormComponent, canActivate: [AuthenticationGuard]},
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'register', component: RegisterFormComponent},
  { path: 'signin', component: SignInFormComponent}
]