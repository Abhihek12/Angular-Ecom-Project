import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  userSignup(user: SignUp) {
    this.http.post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        console.log(result);

        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/'])

        }

      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }




  userLogin(data: Login) {






    this.http.get<Login[]>(`http://localhost:3000/users?email=${data.email}&&password=${data.password}`, { observe: "response" })
      .subscribe((result) => {
        if (result && result.body?.length) {

          this.invalidUserAuth.emit(false)


          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/'])

         // console.log(result.body[0]);




        }
        else { 

          // if Email password doesent match
          this.invalidUserAuth.emit(true)
        }

      })




  }

}
