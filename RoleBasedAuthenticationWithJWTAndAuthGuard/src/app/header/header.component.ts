import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../_service/product.service';
import { RoleService } from '../_service/role.service';
import { UserAuthService } from '../_service/user-auth.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  timeOutStatus: any;
  timeOutDescription: any;
  password1:any;
  password2:any;
  roles: object[] | any;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private roleService: RoleService,
    private productService:ProductService
  ) {}

  ngOnInit(): void {
    this.password1="";
    this.password2="";
    this.timeOutStatus = false;
    

    this.roleService.findAll().subscribe((data) => {
      //subscribe => call back => Its used for calling a method inside a another method.
      this.roles = data;
      console.log('All Roles totally => ' + this.roles.length);
    });

    this.userService.findAllUsers().subscribe((data)=>{
      console.log(data);
    });
  }


  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    if (this.isLoggedIn() === true) {
      Swal.fire({
        title: 'Are you sure?',
        confirmButtonText: 'Yes, Go away!',
        confirmButtonColor: 'black',
        cancelButtonText: 'No, Stay here!',
        showCancelButton: true,
        cancelButtonColor: 'green'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userAuthService.clear();
          this.router.navigate(['/home']);
        }
      });
    }
  }

  naviAdmin() {
    this.timeOutStatus = true;
    this.timeOutDescription = 'Please hold on we are fetching your details....';
    setTimeout(() => {
      this.timeOutStatus = false;
      this.router.navigate(['/admindashboard']);
    }, 5000);
  }

  naviProducts() {
    this.timeOutStatus = true;
    this.timeOutDescription = 'Please hold on we are fetching your details....';
    setTimeout(() => {
      this.timeOutStatus = false;
      this.router.navigate(['/products']);
    }, 5000);
  }

  tohome() {
    let val: object | any;
    val = this.userAuthService.getRoles();
    console.log(val);
    if(val === null){
      this.router.navigate(['/home']);
    }else{
    let roleName = val.split(':')[1].split(',')[0].replaceAll('"', '');
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleName === roleName) {
        console.log('Yes' + i);
        this.router.navigate([roleName.toLowerCase()]);
      }
    }
  }}


  updateUser(){
    Swal.fire({
      position:"top",
      title: 'Do you want to change password?',
      confirmButtonText: 'Yes',
      confirmButtonColor: 'green',
      cancelButtonText: 'No',
      showCancelButton: true,
      cancelButtonColor: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Enter your new password',
          input:'password',
          confirmButtonText: 'Next ->',
          confirmButtonColor: 'green',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          cancelButtonColor: 'red'
        }).then((result)=>{
          if (result.isConfirmed) {
            this.checkingPassword2(result.value);
          }
        })
      }
    });
  }
  checkingPassword2(pass1:any){
    Swal.fire({
      title: 'Enter your confirm password',
      input:'password',
      confirmButtonText: 'Next ->',
      confirmButtonColor: 'green',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      cancelButtonColor: 'red'
    }).then((result)=>{
      if (result.isConfirmed) {
        if(result.value !== pass1){
          this.checkingPassword2(pass1);
        }else{
          alert("Password Changed "+pass1+" and "+result.value);
        }
        
      }
    });
  }

}
