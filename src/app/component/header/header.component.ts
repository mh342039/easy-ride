import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, public _dataService: DataService) { }

  ngOnInit(): void {
  }

  logIn(){
    const dialogRef = this.dialog.open(SignInComponent,{
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this._dataService.createUserSession(result)
    });
  }

  signUp(){
    const dialogRef = this.dialog.open(SignUpComponent,{
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });

  }

  logout(){
    this._dataService.clearUserSession()
    this.router.navigateByUrl('/main/home-page')
  }

 
}
