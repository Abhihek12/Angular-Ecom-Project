import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  
productMessage: undefined | string;
populateData:undefined | product;

constructor(private route:ActivatedRoute,private router : Router, private product:ProductService)
{

  // Activate route && [ this.route.snapshot.paramMap.get("id"); ] is use to fetch the id of product you have click to edit 
// then use the id to take the data of that id from json-server

  let productId = this.route.snapshot.paramMap.get("id");
  console.log(productId);
  productId && this.product.getProduct(productId).subscribe((data)=>{
    console.log(data)
    this.populateData = data;
  })
}



  submit(data:product)
  {


    this.product.updateProduct(data).subscribe((result)=>{
      if(result)
      {
        this.productMessage = " Product had Updated !"

      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(['/seller-home']);
    }, 2000);
   


  }

}
