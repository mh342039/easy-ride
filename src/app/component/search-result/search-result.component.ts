import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  constructor(private dialog: MatDialog, private _httpService: HttpService, private router: Router, public _dataservice: DataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(!this._dataservice.getAccessToken()){
      this.router.navigateByUrl('/main/home-page')
    }
  }

  searchRide(){
    this.cd.markForCheck()
  }

  book(){
    const dialogRef = this.dialog.open(MessageComponent, {
      data: {
        type: 'C',
        title: 'Success!',
        message: 'Seat Booked Successfully!. Thank you for your time!',
        duration: 3000
      }
    });

  }

}
