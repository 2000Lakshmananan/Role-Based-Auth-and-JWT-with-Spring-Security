import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleService } from '../_service/role.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}
  roles: object[] | any;
  errorStatus: any;
  errorDescription: any;
  ngOnInit(): void {
    this.errorStatus = false;
    this.roleService.findAll().subscribe((data) => {
      this.roles = data;
      console.log('All Roles totally => ' + this.roles.length);
    });
  }

  signup(signupForm: NgForm) {
    if (
      signupForm.value.userName === '' ||
      signupForm.value.userFirstName === '' ||
      signupForm.value.userPassword === ''
    ) {
      this.errorStatus = true;
      this.errorDescription = 'Please enter data fully.';
    } else if (signupForm.value.userLastName === '') {
      this.errorStatus = true;
      this.errorDescription = 'Please select your role.';
    } else {
      console.log(signupForm.value);
      this.userService.signup(signupForm.value).subscribe(
        (data) => {
          Swal.fire({
            position: 'top',
            width: '700px',
            icon: 'success',
            html:
              'Hello, ' +
              signupForm.value.userFirstName +
              ' (' +
              signupForm.value.userLastName +
              ')<br>' +
              'Added Successfully!!!',
            showConfirmButton: false,
            timer: 2150,
          }),
            this.router.navigate(['/login']);
        },
        (error) => alert('Something went worng')
      );
    }
  }
}
