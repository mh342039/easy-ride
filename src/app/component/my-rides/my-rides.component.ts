import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { UpdateRidesComponent } from '../update-rides/update-rides.component';


@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css']
})
export class MyRidesComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, public _dataService: DataService) { }

  ngOnInit(): void {
  }

  edit(){
 
    const dialogRef = this.dialog.open(UpdateRidesComponent,{
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
}

}
