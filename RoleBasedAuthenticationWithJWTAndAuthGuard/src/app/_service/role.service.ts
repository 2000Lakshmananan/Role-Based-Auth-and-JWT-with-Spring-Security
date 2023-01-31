import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  PATH_OF_API = "http://localhost:9090";

  constructor(private httpClient:HttpClient) { }

  public findAll(): Observable<object> { 
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getRoles");
  }

  public newRole(roleData:any): Observable<object>{
    console.log(roleData.value);
    return this.httpClient.post(this.PATH_OF_API+"/createNewRole",roleData);
  }

  public deleteRole(rolename:any):Observable<any>{
    console.log(rolename);
    return this.httpClient.delete(this.PATH_OF_API+"/delete/"+rolename);
  }

  public deleteUserr(username:any):Observable<any>{
    console.log(username);
    return this.httpClient.delete(this.PATH_OF_API+"/deleteUser/"+username);
  }
}
