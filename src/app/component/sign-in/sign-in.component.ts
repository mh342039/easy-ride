import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public SignInFormGroup: any;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private dialogRef: MatDialogRef<SignInComponent>, private _utiltyservice: UtilityService, private _dataservice:DataService, private _httpService: HttpService) { 
    this.SignInFormGroup = new FormGroup({
      Email: new FormControl(''),
      Password: new FormControl(''),
    });
  
  }

  ngOnInit(): void {
    this.SignInFormGroup = this.fb.group({

      Email: ['', [Validators.required, Validators.email]],

      Password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  Signin() {
    if(this.SignInFormGroup.status == "INVALID"){
      return;
    }

    this._utiltyservice.loader = true
    let data: FormData = new FormData();
    data.append("email", this.SignInFormGroup.value.Email) 
    data.append("password", this.SignInFormGroup.value.Password )

    this._httpService.postServiceCall("/login",data)
    .subscribe((result: any)=>{
      this._utiltyservice.loader = false;
      this._dataservice.createUserSession(result)
      this.dialogRef.close()
    },
    (error: any)=>{
      this._utiltyservice.loader = false;

      if(error.status == 401){
        this.dialog.open(MessageComponent, {
          data: {
            type: 'E',
            title: 'Message',
            message: "Incorrect Email/Password",
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
