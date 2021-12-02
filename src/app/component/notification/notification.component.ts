import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent  {

  showNotification: boolean | undefined;
  constructor(){}

  // tslint:disable-next-line:typedef
  openNotification(state: boolean) {
    this.showNotification = state;
  }

}
