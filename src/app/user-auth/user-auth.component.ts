import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Login, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { isEmpty } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLogin: boolean = true;

  showMessage: string | undefined = "";


  userSignupForm: FormGroup;
  name: string = "";
  email: String = "";
  password: string = "";


  constructor(private frbuilder: FormBuilder, private user: UserService, private product: ProductService) {
    this.userSignupForm = frbuilder.group({

      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });

    this.user.userAuthReload();

  }

  loginForm(data: Login) {



    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.log(result + "apple -------");
      if (result) {

        this.showMessage = " You must signup first"

        setTimeout(() => {
          this.showMessage = undefined;
        }, 3000);

      }
      else // if user login details present in the db
      {
        setTimeout(() => {
          this.localCarttoRemoteCart()
        }, 300);
      }

    })








  }

  postData(userSignupForm: SignUp) {
    //send data to user service
    this.user.userSignup(userSignupForm);
  }



  openLogin() {
    this.showLogin = false;
  }

  openSignup() {
    this.showLogin = true;
  }

  localCarttoRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      



      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        }



        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {

            if (result) {
              console.log("item stored in Db");

            }
          })


          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }

        }, 500);

      });

    }

    // Sending user id  for getting cart detail on base of user id
   setTimeout(() => {
    this.product.getCartList(userId)
   }, 500);

  }

}
