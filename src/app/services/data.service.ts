import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userSession: any;
  searchResult: any
  searchCriteria: any = {
    access_token: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: ""
  }
  constructor() {
    this.rePopulateUserSession();
    
  }

  clearUserSession() {
    this.userSession = null
    localStorage.removeItem('user-session')
    
  }

  rePopulateUserSession() {
    let session : any = localStorage.getItem('user-session')
    this.userSession = JSON.parse(session)
  }

  createUserSession(obj: any) {
    localStorage.setItem('user-session', JSON.stringify(obj))
    this.userSession = obj
  }

  getAccessToken() {
    if (this.userSession) {
      return this.userSession.access_token
    }
    else {
      return null
    }
  }


}
