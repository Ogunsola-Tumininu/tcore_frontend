import { Component } from '@angular/core';
import { CreateSiteComponent } from './components/sites/create-site/create-site.component';
import { MatDialog } from '@angular/material';
import { CreatePropertyComponent } from './components/property/create-property/create-property.component';

@Component({

  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  mobWidth: any;

  constructor(
    private dialog: MatDialog,
  ) {
    this.mobWidth = (window.screen.width);
    // console.log(this.mobWidth)
  }

  ngOnInit() {

  }

  addSite() {
    let dialogRef = this.dialog.open(CreateSiteComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  addProperty() {
    let dialogRef = this.dialog.open(CreatePropertyComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '60%',
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }
}
