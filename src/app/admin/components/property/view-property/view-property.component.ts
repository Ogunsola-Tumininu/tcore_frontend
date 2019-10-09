import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UploadFloorComponent } from '../upload-floor/upload-floor.component';
import { Upload3DComponent } from '../upload3-d/upload3-d.component';
import { UploadLayoutComponent } from '../upload-layout/upload-layout.component';
import { ShowUploadComponent } from '../../show-upload/show-upload.component';


@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {

  property: any = {};
  site: any = {};

  dLen: number = 0;
  fLen: number = 0;
  sLen: number = 0;

  floorLayouts: any[] =[];

  mobWidth: any

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    this.mobWidth = (window.screen.width);
   }

  ngOnInit() {
    // Combine them both into a single observable
    const urlParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams})
    );

    // Subscribe to the single observable, giving us both
    urlParams.subscribe(routeParams => {
      // routeParams containing both the query and route params
      this.fetchProperty(routeParams.id);

    });

  }

  fetchProperty(id){
    this.adminService.getOneProperty(id)
      .subscribe((data:any) => {
        if(data.success){
          this.property = data.property;
          this.site = this.property.site;
          var allFloorLayouts = data.property.floor_uploads;
          this.floorLayouts =  allFloorLayouts.splice(0,1);

          this.dLen = this.property.d_uploads.length;
          this.fLen = this.property.floor_uploads.length;
          this.sLen = this.property.site_uploads.length;
          console.log(this.property,  this.fLen)
        }
      })
  }

  showUpload(upload){
    let dialogRef = this.dialog.open(ShowUploadComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '70%',
      height: '100%',
      data: {upload : upload,
        }
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  openUploadFloorDialog(){
    let dialogRef = this.dialog.open(UploadFloorComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '60%',
      data: {
        propertyId : this.property._id,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  openUploadLayoutDialog(){
    let dialogRef = this.dialog.open(UploadLayoutComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '60%',
      data: {
        propertyId : this.property._id,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  openUpload3DDialog(){
    let dialogRef = this.dialog.open(Upload3DComponent, {
      width: '90%',
      data: {
        propertyId : this.property._id,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }


}
