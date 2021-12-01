import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public ProfileFormGroup: any;

  constructor(private fb: FormBuilder, private _httpService: HttpService, private _dataservice: DataService ) { 
    this.ProfileFormGroup = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl(''),
      Phone: new FormControl(''),
    });
  
  }

  ngOnInit(): void {
    this.ProfileFormGroup = this.fb.group({

      FirstName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      LastName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      Email: ['', [Validators.required, Validators.email]],

      Phone: ['', [Validators.pattern("([0-9]+)"), Validators.minLength(10), Validators.maxLength(10)]],

    });
  }


  updateProfile() {
    if(this.ProfileFormGroup.status == "INVALID"){
      return;
    }

    let query = 'access_token='+ this._dataservice.getAccessToken()
    for(let f in this.ProfileFormGroup.value){
      query = query + '&' + f + '=' + this.ProfileFormGroup.value[f]
    }
    console.log(query)
    // data.append("last_name", this.ProfileFormGroup.value.LastName )
    // data.append("email", this.ProfileFormGroup.value.Email) 
    // data.append("phone_number", this.ProfileFormGroup.value.Phone )

    this._httpService.patchServiceCallwithQueryParameters("/account",query)
    .subscribe((result: any)=>{
      console.log(result)
    },
    (error: any)=>{
      console.log(error)
    })
  }
}
