import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userSession: any;
  searchResult: any
  postBack: any = "N"
  searchCriteria: any = {
    access_token: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: ""
  }
  constructor() {
    this.postBack = localStorage.getItem('postback')
    if(this.postBack === "Y"){
    this.rePopulateUserSession();
    }
    else{
      this.postBack = "Y"
      localStorage.setItem('postback', "Y")

    }
  }

  clearUserSession() {
    this.userSession = null
    localStorage.removeItem('user-session')
    localStorage.removeItem('user-session')
    
  }

  rePopulateUserSession() {
    let session : any = localStorage.getItem('user-session')
    if(session){
    this.userSession = JSON.parse(session)
    }
    else{
      this.userSession = null
    }
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
