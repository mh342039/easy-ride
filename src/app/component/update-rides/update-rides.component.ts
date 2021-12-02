import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-update-rides',
  templateUrl: './update-rides.component.html',
  styleUrls: ['./update-rides.component.css']
})
export class UpdateRidesComponent implements OnInit {
  public UpdateRideFormGroup: any;

  constructor(private fb: FormBuilder, private _httpService: HttpService) { 
    this.UpdateRideFormGroup = new FormGroup({
      From: new FormControl(''),
      To: new FormControl(''),
      Price: new FormControl(''),
      Departure: new FormControl(''),
      Arrival: new FormControl(''),
    });
  
  }
  ngOnInit(): void {
  }

}
