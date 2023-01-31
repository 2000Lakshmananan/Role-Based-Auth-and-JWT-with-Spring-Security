import { Component, OnInit } from '@angular/core';
import { ProductEntity } from 'src/app/_class/product-entity';
import { ProductInteraction } from 'src/app/_class/product-interaction';
import { ProductService } from 'src/app/_service/product.service';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  productInteraction:Object[]|any;
  productByID:any;
  productEntity:any;
  productList:any=[];
  listIsNull:any;
  des:any;

  constructor(private productService:ProductService, private userAuthService:UserAuthService,
     private productEn:ProductEntity, private productInter:ProductInteraction) { }

  ngOnInit(): void {
    this.productByID=null;
    this.productList=[];
    // this.listIsNull=false;
    this.productService.getProductInteractionByUserName(this.userAuthService.getUserName()).subscribe((data)=>{
      console.log(data);
      this.productInteraction=data;

    this.productService.findAll().subscribe((data)=>{
      console.log(data);
      this.productEntity=data;

      for(let pi of this.productInteraction){
        for(let pe of this.productEntity){
          if(pi.productId === pe.id && pi.addToCard === true){
            this.productList.push(pe);
          }
        }
      }

      if(this.productList.length === 0){
        this.listIsNull=true;
        this.des="no wayyy";
        console.log(this.listIsNull);
      }
    })})
  }







  buy(id:any){
    console.log(id);
    this.productService.getProductByID(id).subscribe((data)=>{
      this.productEn=data;
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
        this.productEn.productAvailable=this.productEn.productAvailable - ava;
        this.productEn.user=null;
        this.productInter.addToCard=false;
        this.productInter.productId=this.productEn.id;
        this.productInter.productNeed=ava;
        this.productInter.userName=this.userAuthService.getUserName();
        this.productInter.approval=null;
        this.productInter.approvedDate=new Date().getDate()+"/"+(new Date().getUTCMonth()+1)+"/"+new Date().getFullYear();
        Swal.fire({
          position: 'top',
          html:"<p>Your order will be deliveried after getting admin's approval.</p>"
        });
        console.log(this.productInter);
        this.productService.placeProductForUser(this.productInter).subscribe((data)=>{
          console.log("New Updated Product "+data);
          this.ngOnInit();
        });
        this.ngOnInit();
      }
}
}
