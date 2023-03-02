import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
 addproductMessage:string|undefined;
 constructor(private product:ProductService)
 {}





  submit(data:product)
  {
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result)
      if(result)
      {
        this.addproductMessage= "Product is Added Succesfully !"
     
      }
      setTimeout(()=>{this.addproductMessage=undefined},3000)
    
    
    
    });

    
  }
}
