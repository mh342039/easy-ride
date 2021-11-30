import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { TermsComponent } from '../terms/terms.component';
import {FaqComponent} from '../faq/faq.component';
import {ContactComponent} from '../contact/contact.component'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, public _dataService: DataService) { }

  ngOnInit(): void {
  }

  termsnc(){
 
      const dialogRef = this.dialog.open(TermsComponent,{
        width: '500px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
      });
  }
  faqs(){
 
    const dialogRef = this.dialog.open(FaqComponent,{
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
}

contact(){
 
  const dialogRef = this.dialog.open(ContactComponent,{
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    
  });
}
}
