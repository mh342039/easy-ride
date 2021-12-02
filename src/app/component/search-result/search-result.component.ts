import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  constructor(private _httpService: HttpService, private _dataservice: DataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    let queryParameter = 'access_token='+ this._dataservice.getAccessToken()
    this._httpService.getServiceCallWithQueryParameter('/rides', queryParameter)
    .subscribe((result: any)=>{
      console.log(result)
    },
    (error: any)=>{
      console.log(error)
    })
  }

  searchRide(){
    this.cd.markForCheck()
  }

}
