import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/_service/role.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  roles:any;
  users:any;
  timeOutStatus:any;
  timeOutDescription:any;
  constructor(private roleService:RoleService, private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.timeOutStatus=false;
    this.roleService.findAll().subscribe(data => {  
      this.roles=data;
      console.log("All Roles totally => "+this.roles.length);
  });
    this.userService.findAllUsers().subscribe(data =>{
      this.users=data;
      },error=>{
        this.timeOutStatus=true;
        this.timeOutDescription="Time out occured, please refresh the page once again";
        console.log(error.message);
      }
  );
  }

  deleteRole(rolename:any){
    console.log(rolename);
    this.roleService.deleteRole(rolename).subscribe(data=>{
      console.log("Deleted")
      this.ngOnInit();},
      error=>console.log("Deleted"));
      this.ngOnInit();
  } 

  deleteUser(username:any){
    console.log(username);
    this.roleService.deleteUserr(username).subscribe(data=>
      {
        console.log("deleted");
        this.ngOnInit();
      },
      error=>{
      console.log("Error - deleted");
      this.ngOnInit();
      });

  }
}
