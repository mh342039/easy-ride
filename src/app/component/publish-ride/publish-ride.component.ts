import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-publish-ride',
  templateUrl: './publish-ride.component.html',
  styleUrls: ['./publish-ride.component.css']
})
export class PublishRideComponent implements OnInit {

  public RideFormGroup: any;
  minDate:any;
  constructor(private fb: FormBuilder, private _utiltyservice: UtilityService, private _httpService: HttpService, private _dataservice: DataService) { 
    this.RideFormGroup = new FormGroup({
      RideTitle: new FormControl(''),
      Origin: new FormControl(''),
      Destination: new FormControl(''),
      Password: new FormControl(''),
    });
  
  }

  ngOnInit(): void {
    var todayDate = new Date().toISOString();
    this.minDate = todayDate.substring(0,todayDate.length-8);
    this.RideFormGroup = this.fb.group({

      RideTitle: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      Origin: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      Destination: ['', [Validators.required]],

      Time: ['', [Validators.required]],

      Price: ['', [Validators.required]],

    });
  }


  publish() {
    if(this.RideFormGroup.status == "INVALID"){
      return;
    }

    this._utiltyservice.loader = true
    let data: FormData = new FormData();
    data.append("access_token", this._dataservice.getAccessToken())
    data.append("ride_title", this.RideFormGroup.value.RideTitle )
    data.append("origin", this.RideFormGroup.value.Origin )
    data.append("destination", this.RideFormGroup.value.Destination) 
    data.append("time", this.RideFormGroup.value.Time )
    data.append("price", this.RideFormGroup.value.Price )

    this._httpService.postServiceCall("/rides",data)
    .subscribe((result: any)=>{
      console.log(result)
      this._utiltyservice.loader = false
    },
    (error: any)=>{
      console.log(error)
    })
  }

}
