import { Component } from "@angular/core"
import { User } from "../../models/user"

@Component({
    templateUrl: 'signin-form.component.html'
})
export class SignInFormComponent {
    user : User = new User()
}