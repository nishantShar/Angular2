
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './products.service';


@Component({

   
    templateUrl:'./product-list.component.html' ,
    styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit{

pageTitle: string = 'Product List';
errorMessage: string;

imageWidth: number =60;
imageMargin: number =2;
showImage: boolean = false;

_listFilter: string ;

get listFilter():string{

    return this._listFilter;
}

set listFilter(value:string){
this._listFilter = value;
this.filteredProducts =this.listFilter?this.performFilter(this.listFilter):this.products;

}

filteredProducts : IProduct[];

products: IProduct[];

onRatingClicked(message: string): void
{
this.pageTitle = 'ProductList :' + message;

}

toggleImage(): void{

    this.showImage = !this.showImage;
}



constructor(private _productService: ProductService){

}
ngOnInit(): void{
    
    this._productService.getProducts()
    .subscribe(products => {this.products= products; this.filteredProducts = this.products},
    error => this.errorMessage = <any> error);
    }

performFilter(filterBy: string): IProduct[]{
filterBy = filterBy.toLocaleLowerCase();
return this.products.filter((product: IProduct)=>
product.productName.toLocaleLowerCase().indexOf(filterBy) !==-1)

}

 }