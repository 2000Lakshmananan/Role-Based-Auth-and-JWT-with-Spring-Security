import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../_service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService:ProductService,private router:Router) { }

  errorStatus:any;
  errorDescription:any;

  ngOnInit(): void {
  }

  product(productForm:NgForm){
    if(productForm.value.productName === "" && productForm.value.productRate === "" && productForm.value.productAvailable === ""){
      this.errorStatus=true;
      this.errorDescription="Please enter data fully!";
    }else if(productForm.value.productName === ""){
      this.errorStatus=true;
      this.errorDescription="Product name can not be null.";
    }else if(productForm.value.productRate === ""){
      this.errorStatus=true;
      this.errorDescription="Product rate can not be null.";
    }else if(productForm.value.productManufacture === ""){
      this.errorStatus=true;
      this.errorDescription="Product name can not be null.";
    }else if(productForm.value.productAvailable === ""){
      this.errorStatus=true;
      this.errorDescription="Product name can not be null.";
    }else{
      productForm.value.user=null;
      this.productService.newProduct(productForm.value).subscribe(date =>
        {
          console.log("product Added");
        }, error => {
          this.errorStatus=true;
          this.errorDescription="Something went wrong. Try again later...";
        });
      this.router.navigate(['/admin']);
    }
  }
}
