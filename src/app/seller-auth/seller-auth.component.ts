import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponentv implements OnInit {

   authError:String | undefined;
  show=false;

constructor(private seller:SellerService,private route:Router){}
  




// For Switching btw Login & Signup page under seller

ngOnInit(): void {
    this.seller.reloadSeller();
  }

toggle()
{
  this.show=true;
}

toggle1()
{
  this.show=false;
}
  


//taking form data in signup--function
// form will send data to UserSignup() creted in Sell-serveice
//signup is use to take data in specific data type!! ----check Signup.ts


  signUp(data:SignUp):void
  {
    
    this.seller.userSignup(data)

  }


  // this function use to Collect all the data of login and sent it to Seller-service
  // Login is a interface created at data-types go get the accurate data from the from
    


  login(data:SignUp):void
  {
    this.authError="";
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
    this.authError="Email or password is not Correct"
      setTimeout(() => {
        this.authError=undefined;
      }, 2000);
    })

  }


}
