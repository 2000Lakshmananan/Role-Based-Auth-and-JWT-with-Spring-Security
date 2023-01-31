import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleService } from '../_service/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  constructor(private roleService: RoleService, private router: Router) {}
  roles: object[] | any;
  errorStatus: any;
  errorDescription: any;
  flag = 0;
  ngOnInit(): void {
    this.flag = 0;
    this.errorStatus = false;
    this.roleService.findAll().subscribe((data) => {
      this.roles = data;
      console.log('All Roles totally => ' + this.roles.length);
    });
  }

  role(roleForm: NgForm) {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleName === roleForm.value.roleName) {
        this.flag = 1;
        break;
      }
    }
    if (roleForm.value.roleName == '' && roleForm.value.roleDescription == '') {
      this.errorStatus = true;
      this.errorDescription = 'Please enter data fully.';
    } else if (roleForm.value.roleName == '') {
      this.errorStatus = true;
      this.errorDescription = 'Role name can not be null.';
    } else if (roleForm.value.roleDescription == '') {
      this.errorStatus = true;
      this.errorDescription = 'Role description can not be null.';
    } else if (this.flag === 1) {
      this.errorStatus = true;
      this.errorDescription = 'This Role already presented.';
    } else {
      console.log('roles ' + roleForm.value);
      this.roleService.newRole(roleForm.value).subscribe((data) => {
        Swal.fire({
          position: 'top',
          width: '700px',
          icon: 'success',
          html:
            '<b>Role : </b>' +
            roleForm.value.roleName +
            '<br>' +
            '<b>Description : </b>' +
            roleForm.value.roleDescription +
            '<br>' +
            'Added Successfully!!!',
          showConfirmButton: false,
          timer: 2250,
        }),
          this.router.navigate(['/admin']);
      });
    }
  }
}
