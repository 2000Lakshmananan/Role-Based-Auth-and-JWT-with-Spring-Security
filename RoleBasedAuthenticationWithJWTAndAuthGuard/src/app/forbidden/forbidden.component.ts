import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {
  redirect:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.redirect=true;
    }, 2000);
    setTimeout(()=>{
      this.router.navigate(['/home']);
    },5000);
  }

}
