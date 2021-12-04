import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public ProfileFormGroup: any;

  constructor(private fb: FormBuilder, private _utiltyservice: UtilityService, private _httpService: HttpService) { 
    this.ProfileFormGroup = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl(''),
      Password: new FormControl(''),
      ConfirmPassword: new FormControl(''),
    });
  
  }

  ngOnInit(): void {
    this.ProfileFormGroup = this.fb.group({

      FirstName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      LastName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      Email: ['', [Validators.required, Validators.email]],

      Phone: ['', [Validators.pattern("([0-9]+)"), Validators.minLength(10), Validators.maxLength(10)]],

      Password: ['', [Validators.required, Validators.minLength(8)]],

      ConfirmPassword: ['', Validators.required]
    },
      {
        validator: this.checkPassword()
      });
  }

  checkPassword() {
    return (group: FormGroup) => {
      const password = group.controls['Password'];
      const confirmPassword = group.controls['ConfirmPassword'];
      if (confirmPassword.errors && confirmPassword.errors.mismatch) {
        return;
      }
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      }
    }
  }

  Signup() {
    if(this.ProfileFormGroup.status == "INVALID"){
      return;
    }
    
    this._utiltyservice.loader = true
    let data: FormData = new FormData();
    data.append("first_name", this.ProfileFormGroup.value.FirstName )
    data.append("last_name", this.ProfileFormGroup.value.LastName )
    data.append("email", this.ProfileFormGroup.value.Email) 
    data.append("phone_number", this.ProfileFormGroup.value.Phone )
    data.append("password", this.ProfileFormGroup.value.Password )

    this._httpService.postServiceCall("/register",data)
    .subscribe((result: any)=>{
      this._utiltyservice.loader = false  
      console.log(result)
    },
    (error: any)=>{
      console.log(error)
    })
  }

}
