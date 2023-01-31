import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  token:any;
  tokens:any;
  tokenNew: any;

  constructor(private router:Router) { }

  public setRoles(roles:[]){
    localStorage.setItem("roles",JSON.stringify(roles));
  }

  public getRoles():[]|string|null{
    return localStorage.getItem("roles");
  }

  public setJwtToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
    this.automaticallyLogout();
  }

  public getJwtToken():String|null{ 
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    if((this.getRoles() != null) &&(this.getJwtToken != null)){
      return true;
    }
    else{
      return false;
    }
  }

  public setUserName(userName:any){
    localStorage.setItem("userName",userName);
  }

  public getUserName(){
    return localStorage.getItem("userName");
  }

  tokenLive():boolean{
    this.token=this.getJwtToken();
    const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
    console.log(expiry);
    return expiry * 1000 > Date.now();
  }

  automaticallyLogout(){
    this.tokens=this.getJwtToken();
    const expiry = (JSON.parse(atob(this.tokens.split('.')[1]))).exp;
    console.log(expiry * 1000);
    setTimeout(() => {
      this.clear();
      Swal.fire({
        position: 'top',
        title:"Token Expired",
        showConfirmButton: false,
        timer: 2250,
      });
      this.router.navigate(['/home']);
    }, ((expiry * 1000) - new Date().getTime()));
  }
}
