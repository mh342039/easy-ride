import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  localURL = "http://localhost:3000/api";
  ProdURL = "http://bypass.grantchesney.com:8000/api"
  URL:string
  constructor(private http: HttpClient) {
    this.URL = this.ProdURL
  }

  getServiceCall(path: string){
    return this.http.get(this.URL + path);
  }

  postServiceCall(path: string, data:any ){
    return this.http.post(this.URL + path, data);
  }

  putServiceCall(path: string, data:any ){
    return this.http.put(this.URL + path, data);
  }

  deleteServiceCall(path: string, data:any ){
    return this.http.delete(this.URL + path, data);
  }
}