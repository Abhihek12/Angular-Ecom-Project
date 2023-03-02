import { Component, importProvidersFrom } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
searchResult:undefined | product[];
showerror?:boolean = false;
  constructor(private activeRoute : ActivatedRoute,private product:ProductService)
  {

    // snapshot.paramMap.get(query) will get the query the extra parametr pass in url which is given in app-routing
    let query= this.activeRoute.snapshot.paramMap.get('query');
    
    query && this.product.SearchProducts(query).subscribe((result)=>{
      this.searchResult = result;


    })
  }

}
