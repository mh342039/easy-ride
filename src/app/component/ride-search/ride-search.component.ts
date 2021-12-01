import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-ride-search',
  templateUrl: './ride-search.component.html',
  styleUrls: ['./ride-search.component.css']
})
export class RideSearchComponent implements OnInit {
  @Output() searchRide = new EventEmitter();

  public SearchFormGroup: any;

  constructor(private fb: FormBuilder, private _dataservice: DataService, private _httpService: HttpService, private router: Router) { 
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
    let query = ""
    this._httpService.getServiceCallWithQueryParameter('rides','access_token='+this._dataservice.getAccessToken + 'query='+ query)
    .subscribe((result: any)=>{
      console.log(result)
      this._dataservice.searchResult = result
      this.searchRide.emit();
    },
    (error: any)=>{
      console.log(error)
    })
    
    
}
}
