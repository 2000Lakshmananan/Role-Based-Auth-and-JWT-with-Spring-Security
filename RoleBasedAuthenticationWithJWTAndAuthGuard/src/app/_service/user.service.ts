import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, timeout } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";
 
  requestHeader = new HttpHeaders(
    {"No_Auth":"True"}
  );

  // token=this.userAuthService.getJwtToken();

  newHeader=new HttpHeaders(
    {"Authorization":""}
  );

  constructor(private httpClient: HttpClient,private userAuthService:UserAuthService) { }

  public forUser(){
    return this.httpClient.get(this.PATH_OF_API+'/forUser', {responseType:'text',});
  }

  public forAdmin(){
    return this.httpClient.get(this.PATH_OF_API+'/forAdmin', {responseType:'text',});
  }

  public login(loginData:any){
    return this.httpClient.post(this.PATH_OF_API+"/authenticate",loginData,{headers:this.requestHeader});
  }

  public authMyToken(token:any){
    console.log(token);
    const headers=new HttpHeaders().set("Authorization",token);
    return this.httpClient.get(this.PATH_OF_API+"/",{headers,responseType:'text' as 'json'});
  }

  public findAllUsers():Observable<object>{
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getusers")
    .pipe(
      timeout(10000000));
  }

  public getUserByUserName(userName:any){
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getUserByUserName/"+userName);
  }

  public signup(signupData:any):Observable<object>{
    return this.httpClient.post(this.PATH_OF_API+"/registerNewUser",signupData);
  }

  public roleMatch(allowedRoles:any):boolean{
    let isMatch=false;
    const userRoles:any = this.userAuthService.getRoles();
    if(userRoles !=null){
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<allowedRoles.length;j++){
          let text=userRoles;
          const ss=text.split(":");
          const aa=ss[1].split(",");
          if(aa[0].replaceAll("\"","") === allowedRoles[j]){
            isMatch=true;
            return isMatch;
          }else{
            return isMatch;
          }
        }
      }
  } 
  return isMatch;
}
}