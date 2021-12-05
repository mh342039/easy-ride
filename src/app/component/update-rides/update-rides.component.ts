import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MessageComponent } from '../message/message.component';


@Component({
  selector: 'app-update-rides',
  templateUrl: './update-rides.component.html',
  styleUrls: ['./update-rides.component.css']
})
export class UpdateRidesComponent implements OnInit {
  public UpdateRideFormGroup: any;
  rideDetail: any

  constructor(public dialog: MatDialog, private router: Router, private fb: FormBuilder, public _dataservice: DataService, private _httpService: HttpService, private _utilityservice: UtilityService,  @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.UpdateRideFormGroup = new FormGroup({
      From: new FormControl(''),
      To: new FormControl(''),
      Price: new FormControl(''),
      Departure: new FormControl(''),
      Title: new FormControl(''),
    });
  
  }
  ngOnInit(): void {
    this._utilityservice.loader = true

    let query = 'access_token=' + this._dataservice.getAccessToken()
    query = query + '&query=' + this.data.id

    if (this._dataservice.getAccessToken()) {
      this._httpService.getServiceCallWithQueryParameter('/rides', query)
        .subscribe((result: any) => {
          console.log(result)
          this._utilityservice.loader = false
          this.rideDetail = result

          this.UpdateRideFormGroup = this.fb.group({

            From: [result.origin, [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],
      
            To: [result.destination, [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],
      
            Price: [result.price, [Validators.required]],
      
            Departure: [result.time, [Validators.required]],
      
            Title: [result.ride_title, [Validators.required]]
          });
        },
          (error: any) => {
            this._utilityservice.loader = false
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
          }          
        })
    }

  }

  delete(){
    this._utilityservice.deleteRide(this.data.id)
  }
}
