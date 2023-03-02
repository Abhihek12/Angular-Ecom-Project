import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList:undefined | product [] ;
  productMessage :undefined | string;

  constructor(private product : ProductService)
  {
    this.list();
  }

  // delete product
  deleteProduct(id:number)
  {
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is Deleted"
        this.list();
      }
    })

    setTimeout(()=>{
      this.productMessage=undefined
    },3000);

    
  }

  // this is used to show the list of product 

  list()
  {
    this.product.productList().subscribe((result)=>{
      if(result)
      {
        this.productList=result;
      }
    })
    
  }


}
