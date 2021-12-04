import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  constructor(private _httpService: HttpService, public _dataservice: DataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this._dataservice.searchCriteria)
  }

  searchRide(){
    this.cd.markForCheck()
  }

}
