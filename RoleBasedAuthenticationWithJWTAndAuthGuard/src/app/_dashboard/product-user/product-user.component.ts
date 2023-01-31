import { Component, OnInit } from '@angular/core';
import { ProductEntity } from 'src/app/_class/product-entity';
import { ProductInteraction } from 'src/app/_class/product-interaction';
import { ProductService } from 'src/app/_service/product.service';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.css']
})
export class ProductUserComponent implements OnInit {

  timeOutStatus: any;
  timeOutDescription: any;
  productsList: any;
  productByID:any;
  userByusername:any;

  constructor(private productService:ProductService,private userAuthService:UserAuthService, 
    private userService:UserService, private productEntity:ProductEntity, 
    private productInteraction:ProductInteraction, private productInter:ProductInteraction,
    private productEn:ProductEntity) { }

  ngOnInit(): void {
    timeOutStatus: false;
    this.productsList=null;
    this.productByID=null;
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
      });
      this.userService.getUserByUserName(this.userAuthService.getUserName()).subscribe((data)=>{
        this.userByusername=data;
        console.log(this.userByusername);
      })
  }

  buy(id:any){
    console.log(id);
    this.productService.getProductByID(id).subscribe((data)=>{
      this.productEntity=data;
      this.productByID=data
  });
    console.log(this.productByID);
    Swal.fire({
      input: 'text',
      position: 'top',
      html:
        '<img src=' +
        this.productByID.projectImage +
        " style='border-radius: 20%;' width='100px' height='100px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        'ID : #' +
        (this.productByID.id + 1000) +
        ', Name : ' +
        this.productByID.productName +
        '<br><h1>Number of products?</h1>',
      confirmButtonText: 'Next ->',
    }).then((result) => {
      console.log(result.value);
      console.log(this.productByID.productAvailable);
      if(result.value === ""){this.ngOnInit();}
      else{
          this.availabilityChecker(result.value);
      }
    });
  }

availabilityChecker(ava:any){
      if(ava > this.productByID.productAvailable){
        Swal.fire({
          input: 'text',
          position: 'top',
          html:"<p>Product Availablity is lower than your need. Try to enter below "+this.productByID.productAvailable+"(Nos.).<br><h1>Number of products?</h1>",
          confirmButtonText: 'Next ->',
        }).then((result)=>{
          if(result.value === ""){this.ngOnInit();}
          else{
              this.availabilityChecker(result.value);
          }
        })
        this.ngOnInit();
      }else{
        this.productEntity.productAvailable=this.productEntity.productAvailable - ava;
        this.productEntity.user=null;
        this.productInteraction.addToCard=false;
        this.productInteraction.productId=this.productEntity.id;
        this.productInteraction.productNeed=ava;
        this.productInteraction.userName=this.userAuthService.getUserName();
        this.productInteraction.approval=null;

        this.productInteraction.approvedDate=new Date().getDate()+"/"+(new Date().getUTCMonth()+1)+"/"+new Date().getFullYear();
        Swal.fire({
          position: 'top',
          html:"<p>Your order will be deliveried after getting admin's approval.</p>"
        });
        this.productService.placeProductForUser(this.productInteraction).subscribe((data)=>{
          console.log("New Updated Product "+data);
        });
        this.ngOnInit();
      }
}
  card(id:any){
    console.log(id);
    this.productService.getProductByID(id).subscribe((data)=>{
      this.productEn=data;
  });
  this.productInter.addToCard=true;
  this.productInter.productNeed=0;
  this.productInter.productId=id;
  this.productInter.userName=this.userAuthService.getUserName();
  this.productInter.approvedDate=new Date().getDate()+"/"+(new Date().getUTCMonth()+1)+"/"+new Date().getFullYear();
  this.productService.placeProductForUser(this.productInter).subscribe((data)=>{
    console.log("New addtocard Product "+data);
  });
  }

}
