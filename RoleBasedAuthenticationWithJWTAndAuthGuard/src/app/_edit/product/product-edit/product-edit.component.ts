import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  ProductDetail: any;
  errorStatus: any;
  errorDescription: any;
  constructor(private routerActivated: ActivatedRoute, private productService: ProductService) {}
  product = this.routerActivated.snapshot.params['product'];

  ngOnInit(): void {
    this.errorStatus=false;
    console.log(this.product);
    this.productService.getProductByID(this.product).subscribe((data) => {
        this.ProductDetail = data;
        console.log(this.ProductDetail);
      },(error) => {
        console.log('error');
      });
  }

  productNew(productForm:NgForm){
    console.log(productForm.value);
    productForm.value.id=this.ProductDetail.value.id;
    console.log(productForm.value);
  }

}
