import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'easy-ride';
  searchRide = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    passenger: new FormControl(''),
  })

  search(){
    console.warn(this.searchRide.value)
  }


}
