import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
    registerForm : FormGroup
    constructor(private fb : FormBuilder, 
                private toastr : ToastrService,
                private router : Router,
                private authService : AuthenticationService){}

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            _id: [null],
            firstName : [null, Validators.required],
            lastName : [null, Validators.required],
            email : [null, [Validators.required, Validators.pattern(/.+@.+\..+/)]], //Exact pattern to ve inserted here
            username : [null, Validators.required],
            password : [null, Validators.required]
        })
    }

    submitForm(f: NgForm): void {
        if(f.valid){
            const user : User = Object.assign({}, this.registerForm.value)
            this.authService.register(user).subscribe(res => {
                this.toastr.success("Successfully registered.")
                this.router.navigate(['/movies'])
            }, err => {
                this.toastr.error("Unable to register user.")
            })
        }
    }


    get firstName() { return this.registerForm.get('firstName') }
    get lastName() { return this.registerForm.get('lastName') }
    get email() { return this.registerForm.get('email') }
    get username() { return this.registerForm.get('username') }
    get password() { return this.registerForm.get('password') }
    
}