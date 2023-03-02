import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Login, SignUp } from '../data-type'
import { BehaviorSubject } from 'rxjs'
import {  Router } from '@angular/router'


@Injectable({
  providedIn: 'root',
})
export class SellerService {

  // BehaviorSubject is both observer and
  //  type of observable. BehaviorSubject 
  //  always need an initial/default value.
  //   Every observer on subscribe gets current
  //    value. Current value is either latest value 
  //    emitted by source observable using 
  // next() method or initial/default value. 
  //                                         


  isSellerLoggedIn = new BehaviorSubject<boolean>(false) 
  
 isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient,private route:Router) {}

  userSignup(data: SignUp) {
    this.http.post('http://localhost:3000/Seller', data , { observe: 'response' })
      .subscribe((result) => {
       console.log(result)
        if(result)
        {
          localStorage.setItem('seller',JSON.stringify(result.body));
          this.route.navigate(['seller-home']);
           
        }
       
        // Call back function for subscribe
      })

    } 


//  this function is user for keep user login after reload page and After Succesfully Login

     reloadSeller()
      {
        if(localStorage.getItem('seller'))
        {
          this.isSellerLoggedIn.next(true); 
         this.route.navigate(['seller-home']);
        }
      }

      userLogin(data:Login)
      {
     
      //Api call will be there

      // check for data present in Json Server for Login 
      this.http.get(`http://localhost:3000/Seller?email=${data.email}&password=${data.password}`,
      {observe:"response"}).subscribe((result:any)=>{
        console.log(result);
        if(result && result.body && result.body.length)
        {
          console.log("User LogIn")
          localStorage.setItem('seller',JSON.stringify(result.body));
          this.route.navigate(['seller-home']);
        }else
        {
          console.log("Login Fail!")
          this.isLoginError.emit(true)
        }
      })
      }


    
  }

