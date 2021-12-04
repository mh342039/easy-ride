import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userSession: any;
  searchResult: any
  constructor() { }

  clearUserSession(){
    localStorage.removeItem('user-session')
    this.userSession = null
  }

  rePopulateUserSession(){
  this.userSession = localStorage.getItem('user-session')
  }

  createUserSession(obj: any){
    localStorage.setItem('user-session', obj)
    this.userSession = obj
  }

  getAccessToken(){
    return this.userSession.access_token
  }

  
}
