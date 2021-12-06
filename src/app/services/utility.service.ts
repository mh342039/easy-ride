import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../component/message/message.component';
import { SignInComponent } from '../component/sign-in/sign-in.component';
import { DataService } from './data.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  loader: boolean = false
  constructor(public dialog: MatDialog, private router: Router, private _httpService: HttpService, public _dataservice: DataService) { }

  logIn(){
    const dialogRef = this.dialog.open(SignInComponent,{
      width: '500px',
    });
  }

  getMyRides(){
    this.loader = true

    let query = 'access_token=' + this._dataservice.getAccessToken()
    query = query + '&query=Clayton'

    if (this._dataservice.getAccessToken()) {
      this._httpService.getServiceCallWithQueryParameter('/rides', query)
        .subscribe((result: any) => {
          this.loader = false
          this._dataservice.myRide = result
        },
          (error: any) => {
            this.loader = false
            if (error.status = 401) {
              this.router.navigateByUrl('/main/home-page')
              this.dialog.open(MessageComponent, {
                data: {
                  type: 'E',
                  title: 'System Error',
                  message: 'Session Expired. Please Login Again.',
                }
              });
            }
            else {
              this.dialog.open(MessageComponent, {
                data: {
                  type: 'E',
                  title: 'System Error',
                  message: 'Something Went Wrong. Please Try Again.',
                }
              });
            }
          })
    }
  }
  deleteRide(ride_id:any) {
    this.loader = true
    let query = 'access_token=' + this._dataservice.getAccessToken() + '&ride_id=' + ride_id
    this._httpService.deleteServiceCallwithQueryparameter("/rides", query)
      .subscribe((result: any) => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: {
            type: 'C',
            title: 'Ride Deleted Successfully!',
            message: 'Hope you had a pleasent experience!. See you soon!',
            duration: 3000
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getMyRides()
        })
        this.loader = false
      },
        (error: any) => {
          this.loader = false
          if (error.status = 401){
            this._dataservice.clearUserSession()
            this.router.navigateByUrl('/main/home-page')
            this.dialog.open(MessageComponent, {
              data: {
                type: 'E',
                title: 'System Error',
                message: 'Session Expired. Please Login Again.',
              }
            });
          }
          else{
          this.dialog.open(MessageComponent, {
            data: {
              type: 'E',
              title: 'System Error',
              message: 'Something Went Wrong. Please Try Again.',
            }
          });
        }                })
  }
}
