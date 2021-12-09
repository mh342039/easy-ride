import { Component } from '@angular/core';
import { UtilityService } from './services/utility.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Easy Ride';

  constructor(public _utilityservice: UtilityService){}




}
