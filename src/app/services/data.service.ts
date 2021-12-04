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
    this.rePopulateUserSession()

  }

  clearUserSession() {
    localStorage.removeItem('user-session')
    this.userSession = null
  }

  rePopulateUserSession() {
    this.userSession = localStorage.getItem('user-session')
  }

  createUserSession(obj: any) {
    localStorage.setItem('user-session', obj)
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
