import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userAuthService:UserAuthService, private userService:UserService) { }
  response:any;
  ngOnInit(): void {
    let token=this.userAuthService.getJwtToken()?.trim();
    let newtoken="bearer "+token;
    console.log(newtoken);
    this.accessAPI(newtoken);
  }

  public accessAPI(token:any){
    let res=this.userService.authMyToken(token);
    res.subscribe(data => this.response=data)
  }

}
