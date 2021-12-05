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

  
  constructor(public dialog: MatDialog, private _utilityservice: UtilityService, public _dataservice: DataService, private _httpService: HttpService, private router: Router, public _dataService: DataService) { }

  ngOnInit(): void {
    if (!this._dataService.getAccessToken()) {
      this.router.navigateByUrl('/main/home-page')
    }
    else {
      this._utilityservice.getMyRides()
    }
  }

  edit(rideId: any) {

    const dialogRef = this.dialog.open(UpdateRidesComponent, {
      width: '500px',
      data: {
        id: rideId
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(rideId: any) {
    this._utilityservice.deleteRide(rideId)
  }
}
