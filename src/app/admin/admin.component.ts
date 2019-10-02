import { Component } from '@angular/core';
import { CreateSiteComponent } from './components/sites/create-site/create-site.component';
import { MatDialog } from '@angular/material';
import { CreatePropertyComponent } from './components/property/create-property/create-property.component';

@Component({

  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(
    private dialog: MatDialog,
  ){}

  ngOnInit(){

  }

  addSite(){
    let dialogRef = this.dialog.open(CreateSiteComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  addProperty(){
    let dialogRef = this.dialog.open(CreatePropertyComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }
}
