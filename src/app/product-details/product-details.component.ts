import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  color?: any;

  productDetail: undefined | product;

  productQuentity: number = 1
  removeCart: boolean = false;

  cartData: product | undefined;

  constructor(private activeroute: ActivatedRoute, private product: ProductService) {
    let productid = this.activeroute.snapshot.paramMap.get("productId");
    // console.log(productid);

    productid && this.product.getProduct(productid).subscribe((result) => {
      // console.log(result);
      this.productDetail = result;
      this.color = result.color;
    })

    // checking for similar id exist in cart localstorage then show option remove item 

    let cartData = localStorage.getItem('localCart');
    if (productid && cartData) {
      let items = JSON.parse(cartData);

      items = items.filter((item: product) => productid == item.id.toString())
      if (items.length) {




        this.removeCart = true;
      }
      else {
        this.removeCart = false;
      }

    }




    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);
      
      this.product.cartData.subscribe((result) => {
        let item = result.filter((item: product) => 
          productid?.toString() === item.productId?.toString())
        

        if (item.length) {



          //if use ris logged in
          this.cartData = item[0];
          
          this.removeCart = true;
        }
      })

    }




  }

  handelQuentity(val: string) {

    if (this.productQuentity < 20 && val === 'plus') {
      this.productQuentity += 1;

    }
    else if (this.productQuentity > 1 && val === 'min') {
      this.productQuentity -= 1;

    }
  }

  AddToCart() {
    if (this.productDetail) {
      this.productDetail.quantity = this.productQuentity

      // IF USER IS NOT LOGIN THEN STORE DATA IN LOCAL STORAGE
      if (!localStorage.getItem('user')) {
        console.log(this.productDetail);
        this.product.localAddToCart(this.productDetail);
        this.removeCart = true; // to change add to cart to remove to cart ##
      }
      else {

        //--------------------------ADD TO CART FOR SPECIFIC USER ------------------------------------

        // IF USER IS  LOGIN THEN ADD THE PRODUCT TO THAT USER ID 

        console.warn("User Logeed IN ===");

        let user = localStorage.getItem('user');

        let userId = user && JSON.parse(user).id; // TAKING USER ID



        let cartData: cart = {
          ...this.productDetail, userId,
          productId: this.productDetail.id,
        }


        delete cartData.id;
        console.warn(cartData);


        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }

        })





      }



    }


  }

  RemoveToCart(productId: number) {

    // for remove item when user is not login data in LocalStorage

    if (!localStorage.getItem('user')) {
      this.product.removeFromCArt(productId);
     

    } else {

      
      let user = localStorage.getItem('user');

      let userId = user && JSON.parse(user).id; // TAKING USER ID


      console.log(this.cartData);
    
    this.cartData &&  this.product.removetoCart(this.cartData.id).subscribe((result)=>{
this.product.getCartList(userId)
    })

      //if user login calling api form product service to remove data from cart




    }
    this.removeCart = false; // to change Remove to cart to add to cart ##}



  }
}
