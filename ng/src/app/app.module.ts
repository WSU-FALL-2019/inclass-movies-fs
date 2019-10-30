import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './components/app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieCardComponent } from './components/movies/movie-card.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { MovieDetailsComponent } from './components/movies/movie-details.component';
import { MovieFormComponent } from './components/movies/movie-form.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    MovieFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
