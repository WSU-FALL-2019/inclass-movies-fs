import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
    registerForm : FormGroup
    constructor(private fb : FormBuilder, private toastr : ToastrService){}

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
    
}