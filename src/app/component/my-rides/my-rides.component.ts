import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRidesComponent } from '../update-rides/update-rides.component';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpService } from 'src/app/services/http.service';
import { MessageComponent } from '../message/message.component';


@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css']
})
export class MyRidesComponent implements OnInit {

  myRide: any = []
  constructor(public dialog: MatDialog, private _utilityservice: UtilityService, public _dataservice: DataService, private _httpService: HttpService, private router: Router, public _dataService: DataService) { }

  ngOnInit(): void {
    if (!this._dataService.getAccessToken()) {
      this.router.navigateByUrl('/main/home-page')
    }
    else {
      this._utilityservice.loader = true

      let query = 'access_token=' + this._dataservice.getAccessToken()
      query = query + '&query=mumford'

      if (this._dataservice.getAccessToken()) {
        this._httpService.getServiceCallWithQueryParameter('/rides', query)
          .subscribe((result: any) => {
            this._utilityservice.loader = false
            this.myRide = result
          },
            (error: any) => {
              this.dialog.open(MessageComponent, {
                data: {
                  type: 'E',
                  title: 'System Error',
                  message: 'Something Went Wrong. Please Try Again.',
                }
              });
            })
      }
    }
  }

  edit() {

    const dialogRef = this.dialog.open(UpdateRidesComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete() {
    this._utilityservice.deleteRide()
  }
}
