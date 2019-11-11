import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService : AuthenticationService, private router : Router){}

  get signedIn() {
    return AuthenticationService.isAuthenticated()
  }

  get notSignedIn() {
    return !this.signedIn
  }

  signout(){
    this.authService.signout();
    this.router.navigate(['/movies'])
  }
}
