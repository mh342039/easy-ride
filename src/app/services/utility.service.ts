import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../component/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public dialog: MatDialog) { }

  logIn(){
    const dialogRef = this.dialog.open(SignInComponent,{
      width: '500px',
    });
  }
}
