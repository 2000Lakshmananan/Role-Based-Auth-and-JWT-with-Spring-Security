import { Component, OnInit } from '@angular/core';
import { ProductInteraction } from 'src/app/_class/product-interaction';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  timeOutStatus: any;
  timeOutDescription: any;
  productsList: any;
  productInter:any;

  constructor(private productService:ProductService, private productInteraction:ProductInteraction) { }

  ngOnInit(): void {
    this.productService.getAllProductInteractions().subscribe(
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

  productApprove(id:any){
    this.productService.getProductInteractionById(id).subscribe((data)=>{
      this.productInter=data;
      console.log(this.productInter.addToCard);
    this.productInteraction.id=id;
    this.productInteraction.addToCard=this.productInter.addToCard;
    this.productInteraction.approval="Approved";
    this.productInteraction.approvedDate=new Date().getDate()+"/"+(new Date().getUTCMonth()+1)+"/"+new Date().getFullYear();
    this.productInteraction.productId=this.productInter.productId;
    this.productInteraction.productNeed=0;
    this.productInteraction.userName=this.productInter.userName;
    this.productService.placeProductForUser(this.productInteraction).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
    });});
    this.ngOnInit();
  }

  productReject(id:any){
    this.productService.getProductInteractionById(id).subscribe((data)=>{
      this.productInter=data;
      console.log(this.productInter.addToCard);
    this.productInteraction.id=id;
    this.productInteraction.addToCard=this.productInter.addToCard;
    this.productInteraction.approval="Rejected";
    this.productInteraction.approvedDate=new Date().getDate()+"/"+(new Date().getUTCMonth()+1)+"/"+new Date().getFullYear();
    this.productInteraction.productId=this.productInter.productId;
    this.productInteraction.productNeed=0;
    this.productInteraction.userName=this.productInter.userName;
    this.productService.placeProductForUser(this.productInteraction).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
    });});
    this.ngOnInit();
  }
}
