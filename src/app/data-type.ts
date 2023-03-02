


/* 

This file is use to specify the correct 
data types to the fuction which are accesing
 the data of user signup through function

*/






// this is for signup
export interface SignUp
{
    name:string,
    password:string,
    email:string
}


// this is for login
export interface Login
{

    email :String,
    password:String

}

// this is for products

export interface product
{  
  name:string,
  price:number,
  category:string,
  color:string,
  description:string,                   
  image:string,
  id:number,
  quantity: undefined | number
  productId : undefined | number;

}

export interface cart
{
    userId: number;
    name: string;
    price: number;
    category: string;
    color: string;
    description: string;
    image: string;
    id: number | undefined;
    quantity: number | undefined;
    productId:number;
}

export interface priceSummary
{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}