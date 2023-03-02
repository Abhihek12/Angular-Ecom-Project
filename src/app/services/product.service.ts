import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, product } from '../data-type';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }


  // to Add product in json - server

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);

  }




  //for display product list 
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products',);
  }


  // delete product by using id
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }


  // id of the product which we are taking from url always we get that in String format && Use get the product you have sarch and click on 
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  // this function is used to update product by using id and product details

  updateProduct(product: product) {

    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product)
  }

  //fro fetching images and details for crousal
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }


  //fro fetching images and details for Trendy Product

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  //for Searching the products &&  FOR DISPLAYING PRODUCT IN SEARCH PAGE

  SearchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: product) { //array product
    let cartData = [];  // Cart Array
    let localCart = localStorage.getItem('localCart');

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));  
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    this.cartData.emit(cartData);
    
    }

    this.cartData.emit(cartData); // this will emit the length of product added in cart 


  }

  removeFromCArt(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id) // dont show the matching id 
      {
        console.log(items);
        localStorage.setItem('localCart', JSON.stringify(items));
        this.cartData.emit(items); // this will emit the length of product added in cart 
      }
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {

    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
       
        // console.log(result);
        
        
        if (result && result.body) {
          this.cartData.emit(result.body);
        }

      });

  }



  removetoCart(cartId:number)
  {

    return this.http.delete('http://localhost:3000/cart/'+cartId);

  }

  currentCart()
  {
//taking User Id from LocalStorage
    let userStore = localStorage.getItem('user');
    let userdata = userStore && JSON.parse(userStore);
    return this.http.get('http://localhost:3000/cart?userId='+userdata.id); // passing user id in cart to retrive the product addd
    

  }

}
