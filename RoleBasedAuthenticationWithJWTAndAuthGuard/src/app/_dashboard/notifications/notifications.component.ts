import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_service/product.service';
import { UserAuthService } from 'src/app/_service/user-auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  productInteractionList:any;

  constructor(private userAuthService:UserAuthService, private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProductInteractionByUserName(this.userAuthService.getUserName()).subscribe((data)=>{
      console.log(data);
      this.productInteractionList=data;
    });
  }

}
