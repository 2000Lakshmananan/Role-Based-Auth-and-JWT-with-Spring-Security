import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEntity } from '../_class/product-entity';
import { ProductInteraction } from '../_class/product-interaction';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PATH_OF_API = "http://localhost:9090";

  constructor(private httpClient:HttpClient, private productEntity:ProductEntity) { }

  public findAll(): Observable<object> { 
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getAllProducts");
  }

  public newProduct(productData:any): Observable<object>{
    console.log(productData.value);
    return this.httpClient.post(this.PATH_OF_API+"/newProduct",productData);
  }

  public getAllProductInteractions(): Observable<object> { 
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getAllProductInteractions");
  }

  public getProductInteractionById(id:any): Observable<object>{
    console.log(id);
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getProductInteractionById/"+id);
  }

  public deleteProduct(productId:any):Observable<any>{
    console.log(productId);
    return this.httpClient.delete(this.PATH_OF_API+"/deleteProduct/"+productId);
  }

  public getProductByID(productId:any):Observable<any>{
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getProductById/"+productId);
  }

  public getProductInteractionByUserName(username:any):Observable<object>{
    return this.httpClient.get<object[]>(this.PATH_OF_API+"/getProductInteractionByUserName/"+username);
  }


  public placeProductForUser(productInteraction:ProductInteraction){
    console.log(productInteraction);
    return this.httpClient.put(this.PATH_OF_API+"/placeProductForUser",productInteraction);
  }
}
