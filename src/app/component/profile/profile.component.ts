import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public ProfileFormGroup: any;

  alaisDict: any = {
    "FirstName":"first_name",
    "LastName":"last_name",
    "Email":"email",
    "Phone":"phone_number",
  }
  constructor(private dialog: MatDialog, private fb: FormBuilder, private router: Router, private _utiltyservice: UtilityService, private _httpService: HttpService, private _dataservice: DataService) {
    this.ProfileFormGroup = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl(''),
      Phone: new FormControl(''),
    });

  }

  ngOnInit(): void {
    if(!this._dataservice.getAccessToken()){
      this.router.navigateByUrl('/main/home-page')
    }
    else{
    this._utiltyservice.loader = true
    this._httpService.getServiceCall('/account?access_token=' + this._dataservice.getAccessToken())
    .subscribe((result: any)=>{
      this._utiltyservice.loader = false
      this.ProfileFormGroup = this.fb.group({

        FirstName: [result.first_name, [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],
  
        LastName: [result.last_name, [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],
  
        Email: [result.email, [Validators.required, Validators.email]],
  
        Phone: [result.phone_number, [Validators.pattern("([0-9]+)"), Validators.minLength(10), Validators.maxLength(10)]],
  
      });
  
    },
    (error: any)=>{
      this._utiltyservice.loader = false
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
    }})
  }
  }


  updateProfile() {
    if (this.ProfileFormGroup.status == "INVALID") {
      return;
    }
    this._utiltyservice.loader = true
    let query = 'access_token=' + this._dataservice.getAccessToken()
    for (let f in this.ProfileFormGroup.value) {
      if (this.ProfileFormGroup.value[f]) {
        query = query + '&' + this.alaisDict[f] + '=' + this.ProfileFormGroup.value[f]
      }
    }

    this._httpService.patchServiceCallwithQueryParameters("/account", query)
      .subscribe((result: any) => {
        this._utiltyservice.loader = false
        const dialogRef = this.dialog.open(MessageComponent, {
          data: {
            type: 'C',
            title: 'Success!',
            message: 'Account Updated Successfully!. Thanks for the Update!',
            duration: 3000
          }
        });

      },
        (error: any) => {
          this._utiltyservice.loader = false
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
        }        })
  }

  deleteAccount(){
    this._utiltyservice.loader = true
    let query = 'access_token=' + this._dataservice.getAccessToken()
    this._httpService.deleteServiceCallwithQueryparameter("/account", query)
      .subscribe((result: any) => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: {
            type: 'C',
            title: 'Account Deleted Successfully!',
            message: 'Hope you had a pleasent experience!. See you soon!',
            duration: 3000
          }
        });
        dialogRef.afterClosed().subscribe(r => {
          this.router.navigateByUrl('/main/home-page')
        })
        this._utiltyservice.loader = false
        this._dataservice.clearUserSession()
      },
        (error: any) => {
          this._utiltyservice.loader = false
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
