import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service'
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient, private cookieService : CookieService){}

    static isAuthenticated() : boolean {
        return localStorage.getItem('auth-token') !== null
    }
    
    static httpHeaders(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
              })
        }
    }
    
    register(user : User): any {
        return this.http.post('/api/users/register', user, httpOptions)
    }

    signin(user: User) : any {
        let res = this.http.post('/api/users/signin', user, httpOptions)
        return res.pipe(
            map(data => {
                if(data['token']){
                    localStorage.setItem('auth-token', data['token'])
                    return true;
                }else{
                    return false
                }
            })
        )
    }

    signout() : void {
        this.cookieService.delete('token')
        localStorage.removeItem('auth-token')
    }
}