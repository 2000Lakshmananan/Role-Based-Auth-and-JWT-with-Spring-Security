import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../_service/user-auth.service";

@Injectable()
  
export class AuthInterceptor implements HttpInterceptor{
    constructor(private userAuthService:UserAuthService,private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get("No-Auth") === "True"){
            return next.handle(req.clone());
        }
        
        const token:any = this.userAuthService.getJwtToken();
        req = this.addToken(req,token);
        console.log(token);
        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse) =>{
                    console.log(err.status);
                    if(err.status === 401){
                        this.router.navigate(['/login']);
                        return throwError("Invalid Credentials")
                    }else if(err.status === 403){
                        this.router.navigate(['/forbidden']);
                    }
                    return throwError("Oops,Something went wrong!!!")
                }
            )
        );
    }

    private addToken(request:HttpRequest<any>,token:string){
        return request.clone(
            {
                setHeaders:{
                    Authorization:`${token}`
                }
            }
        );
    }
}