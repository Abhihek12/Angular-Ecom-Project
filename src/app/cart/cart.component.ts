import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

 cartData: any | undefined;
 priceSummary:priceSummary ={
   price: 0,
   discount: 0,
   tax: 0,
   delivery: 0,
   total: 0
 }

  constructor(private product :ProductService){

this.loadDetails();




  }



  loadDetails()
  {
    this.product.currentCart().subscribe((result)=>{
      console.log(result);
       this.cartData=result;
       let price=0;
       this.cartData.forEach((items:cart) => {
         price=price+ +items.price;
       });
 this.priceSummary.price=price;
 this.priceSummary.discount=price/10;
 this.priceSummary.tax=price/10;
 this.priceSummary.delivery=100;
 this.priceSummary.total=price+(price/10)+100-(price/10);
 console.log(this.priceSummary);
 
 
     })
  }


  removeToCart(cartId:number | undefined)
  {
    cartId && this.cartData &&  this.product.removetoCart(cartId).subscribe((result)=>{
      
         
      this.loadDetails();

    })

        
      
  }


}
