import { Component } from "@angular/core"
import { User } from "../../models/user"
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
    templateUrl: 'signin-form.component.html'
})
export class SignInFormComponent {
    user : User = new User()

    constructor(private toastr : ToastrService,
        private router : Router,
        private authService : AuthenticationService){}

    submitForm(f: NgForm): void {
        if(f.valid){
            this.authService.signin(this.user).subscribe(res => {
                this.toastr.success("Successfully signed in.")
                this.router.navigate(['/movies'])
            }, err => {
                this.toastr.error("Unable to sign in.")
            })
        }
    }
}