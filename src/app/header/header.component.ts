import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menutype: string = "Default"; //Default value use for home
  sellername: string = "";
  serachResult: undefined | product[];

  userNmae:string=""; // this is for User name in header

 cartItems:number=0;


  // check the user in home or in seller to navigate btwn menus of home and seller

  constructor(private route: Router, private product: ProductService) {


    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("seller") && val.url.includes('seller')) {
          
          this.menutype = "Seller"
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerdata = sellerStore && JSON.parse(sellerStore)[0];
            this.sellername = sellerdata.name;
          }
        }
       else if(localStorage.getItem('user'))
       {
        let userStore = localStorage.getItem('user');
        let userdata = userStore && JSON.parse(userStore);
        this.userNmae = userdata.name;
        
        
        this.menutype="user";
this.product.getCartList(userdata.id)

       } else {
        
          this.menutype = "Default"
        }
      }
    });


// get the value store of Add to product in cart and show 

let cartData = localStorage.getItem('localCart')

if(cartData)
{
  this.cartItems =JSON.parse(cartData).length;
}

this.product.cartData.subscribe((items)=>
{
  this.cartItems=items.length; // acces from prdt Service for accesing the no of prdt in cart dynamically
  
})


  }

  // Logout the seller
  logout() {
    localStorage.removeItem("seller");
    this.route.navigate(['/']);
  }

  userLogout()
  {
    localStorage.removeItem("user");
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]); // AFter Logout clear the cart
  }



  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.SearchProducts(element.value).subscribe((result) => {


        result.length = 5;
        this.serachResult = result;

      })
    }
  }

  // FOR HIDING THE SEARCH 

  hideSearch() {
    this.serachResult = undefined;
  }



  submitSearch(val: String) {
    // console.log(val);
    if (val) {
      this.route.navigate([`search/${val}`])
    }
  }



  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);

  }

}
