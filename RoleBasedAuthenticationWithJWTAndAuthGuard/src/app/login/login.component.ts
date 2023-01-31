import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  errorStatus: any;
  errorDescription: any;
  ngOnInit(): void {
    this.errorStatus = false;
  }

  login(loginForm: NgForm) {
    if (loginForm.value.userName === '' && loginForm.value.userPassword === '') {
      this.errorStatus = true;
      this.errorDescription = 'Please enter data fully.';
    } else if (loginForm.value.userName === '') {
      this.errorStatus = true;
      this.errorDescription = 'Username can not be empty.';
    } else if (loginForm.value.userPassword === '') {
      this.errorStatus = true;
      this.errorDescription = 'User password can not be empty.';
    } else {
      this.userService.login(loginForm.value).subscribe(
        (Response: any) => {
          this.userAuthService.setJwtToken(Response.jwtToken);
          this.userAuthService.setUserName(Response.user.userName);
          this.userAuthService.setRoles(Response.user.role);
          if (Response.user.role[0].roleName == 'Admin') {
            this.router.navigate(['/admin']);
          } else if(Response.user.role[0].roleName == 'User'){
            this.router.navigate(['/user']);
          }else{
            this.router.navigate(['/hr']);
          }
        },
        (error) => {
          this.errorDescription = 'Username & password mismatched.';
          this.errorStatus = true;
          console.log(error);
        }
      );
    }
  }
}