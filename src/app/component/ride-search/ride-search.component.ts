import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-ride-search',
  templateUrl: './ride-search.component.html',
  styleUrls: ['./ride-search.component.css']
})
export class RideSearchComponent implements OnInit {
  @Output() searchRide = new EventEmitter();

  public SearchFormGroup: any;

  constructor(private dialog: MatDialog, private _utilityservice: UtilityService, private fb: FormBuilder, public _dataservice: DataService, private _httpService: HttpService, private router: Router) { 
    this.SearchFormGroup = new FormGroup({
      LeaveFrom: new FormControl(''),
      GoingTo: new FormControl(''),
      Date: new FormControl(''),
      Passanger: new FormControl(''),
    });
  
  }

  ngOnInit(): void {
    this.SearchFormGroup = this.fb.group({

      LeaveFrom: [''],

      GoingTo: [''],

      Date: [''],

      Passanger: ['1'],
    } );
  }
  search(){
    this._utilityservice.loader = true

    let query = 'access_token=' + this._dataservice.getAccessToken()
    for (let f in this.SearchFormGroup.value) {
      if (this.SearchFormGroup.value[f] && f!="Passanger") {
        query = query + '&query=' + this.SearchFormGroup.value[f]
        break;
      }
    }

    if(this._dataservice.getAccessToken()){
    this._httpService.getServiceCallWithQueryParameter('/rides',query)
    .subscribe((result: any)=>{
      this._utilityservice.loader = false
      this._dataservice.searchCriteria = this.SearchFormGroup.value
      this._dataservice.searchResult = result
      this.searchRide.emit();
    },
    (error: any)=>{
      this.dialog.open(MessageComponent, {
        data: {
          type: 'E',
          title: 'System Error',
          message: 'Something Went Wrong. Please Try Again.',
        }
      });
})
  }
  else{
    this._utilityservice.logIn()
  }
    
}
}
