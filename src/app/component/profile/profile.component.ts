import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public ProfileFormGroup: any;

  constructor(private fb: FormBuilder, private router: Router, private _utiltyservice: UtilityService, private _httpService: HttpService, private _dataservice: DataService) {
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
      console.log(result)
      this._utiltyservice.loader = false
      this.ProfileFormGroup = this.fb.group({

        FirstName: [result.first_name, [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],
  
        LastName: [result.last_name, [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],
  
        Email: [result.email, [Validators.required, Validators.email]],
  
        Phone: [result.phone_number, [Validators.pattern("([0-9]+)"), Validators.minLength(10), Validators.maxLength(10)]],
  
      });
  
    },
    (error: any)=>{
      console.log(error)
    })
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
        query = query + '&' + f + '=' + this.ProfileFormGroup.value[f]
      }
    }

    this._httpService.patchServiceCallwithQueryParameters("/account", query)
      .subscribe((result: any) => {
        console.log(result)
        this._utiltyservice.loader = false
      },
        (error: any) => {
          console.log(error)
        })
  }

  deleteAccount(){
    this._utiltyservice.loader = true
    let query = 'access_token=' + this._dataservice.getAccessToken()
    this._httpService.deleteServiceCallwithQueryparameter("/account", query)
      .subscribe((result: any) => {
        console.log(result)
        this._utiltyservice.loader = false
      },
        (error: any) => {
          console.log(error)
        })
  }
}
