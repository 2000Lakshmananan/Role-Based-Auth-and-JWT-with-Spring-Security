import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductEntity } from 'src/app/_class/product-entity';
import { ProductService } from 'src/app/_service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css'],
})
export class ProductsDashboardComponent implements OnInit {
  ProductDetail: object[] | any;
  timeOutStatus: any;
  timeOutDescription: any;
  productRateNew: any;
  productAvailableNew: any;
  productExpiryNew: any;
  productForm: object[] | any;
  productsList: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private productEntity: ProductEntity
  ) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe(
      (data) => {
        this.productsList = data;
        console.log(this.productsList);
        console.log('length of product' + this.productsList.length);
      },
      (error) => {
        this.timeOutStatus = true;
        this.timeOutDescription =
          'Time out occured, please refresh the page once again';
        console.log(error.message);
      }
    );
  }

  deleteProduct(id: any) {
    console.log(id);
    Swal.fire({
      title: 'Do you want to delete?',
      confirmButtonText: 'Yes, Delete it!',
      confirmButtonColor: 'black',
      cancelButtonText: "No, Don't delete!",
      showCancelButton: true,
      cancelButtonColor: 'green',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          (data) => {
            console.log('deleted successfully.');
            this.ngOnInit();
          },
          (error) => {
            console.log('Can not delete it.');
            this.ngOnInit();
          }
        );
      }
    });
  }

  editProduct(product: any) {
    this.timeOutStatus=false;
    console.log(product);
    this.productService.getProductByID(product).subscribe(
      (data) => {
        console.log(data);
        this.ProductDetail = data;
        console.log(this.ProductDetail);
        Swal.fire({
          input: 'text',
          inputValue: this.ProductDetail.productRate,
          position: 'top',
          html:
            '<img src=' +
            this.ProductDetail.projectImage +
            " style='border-radius: 20%;' width='100px' height='100px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            'ID : #' +
            (this.ProductDetail.id + 1000) +
            ', Name : ' +
            this.ProductDetail.productName +
            '<br><h1>Enter Product Rate(₹)</h1>',
          confirmButtonText: 'Next ->',
        }).then((result) => {
          this.productRateNew = result.value;
          console.log(result.value);
          Swal.fire({
            input: 'text',
            position: 'top',
            inputValue: this.ProductDetail.productAvailable,
            html:
              '<img src=' +
              this.ProductDetail.projectImage +
              " style='border-radius: 20%;' width='100px' height='100px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
              'ID : #' +
              (this.ProductDetail.id + 1000) +
              ', Name : ' +
              this.ProductDetail.productName +
              '<br><h1>Enter Availability(nos.)</h1>',
            confirmButtonText: 'Next ->',
          }).then((result) => {
            this.productAvailableNew = result.value;
            console.log(result.value);
            Swal.fire({
              input: 'text',
              inputValue: this.ProductDetail.productExpiry,
              position: 'top',
              html:
                '<img src=' +
                this.ProductDetail.projectImage +
                " style='border-radius: 20%;' width='100px' height='100px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                'ID : #' +
                (this.ProductDetail.id + 1000) +
                ', Name : ' +
                this.ProductDetail.productName +
                '<br><h1>Enter Product Expiry</h1>',
              confirmButtonText: 'Done',
            }).then((result) => {
              this.productExpiryNew = result.value;
              console.log(result.value);
              this.ProductDetailsNew(
                this.ProductDetail,
                this.productAvailableNew,
                this.productExpiryNew,
                this.productRateNew
              );
            });
          });
        });
      },
      (error) => {
        console.log('error');
      }
    );
  }

  ProductDetailsNew(
    productDetails: object[] | any,
    productAvailables: any,
    productExpiries: any,
    productRates: any
  ) {
    console.log(Object.values(productDetails) + ' ' + productExpiries);
    this.productEntity.id = Object.values(productDetails)[7];
    this.productEntity.productName = Object.values(productDetails)[0];
    this.productEntity.projectImage = Object.values(productDetails)[1];
    this.productEntity.productRate = productRates;
    this.productEntity.productExpiry = productExpiries;
    this.productEntity.productManufacture = Object.values(productDetails)[4];
    this.productEntity.productAvailable = productAvailables;
    this.productEntity.user = null;

    console.log(this.productEntity);
    this.productService.newProduct(this.productEntity).subscribe(
      (date) => {
        console.log('product Added');
        this.ngOnInit();
      },
      (error) => {
        this.timeOutStatus = true;
        this.timeOutDescription =
          'Product updates could not be done. Try again!!!';
      }
    );
  }
}
