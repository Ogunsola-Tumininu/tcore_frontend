import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { MoreLayoutComponent } from '../more-layout/more-layout.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  project: any = {};
  uploadsLen : number = 0;
  uploads: any = [];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    // Combine them both into a single observable
    const urlParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    // Subscribe to the single observable, giving us both
    urlParams.subscribe(routeParams => {
      // routeParams containing both the query and route params
      this.fetchProject(routeParams.id);

    });
  }

  fetchProject(id) {
    this.adminService.getOneProject(id)
      .subscribe((data: any) => {
        if (data.success) {
          this.project = data.project;
          this.uploadsLen = this.project.uploads.length;
          this.uploads = this.project.uploads;

        }
      })
  }

  openMoreLayoutDialog() {
    let dialogRef = this.dialog.open(MoreLayoutComponent, {
      width: '60%',
      data: {
        projectId: this.project._id,
        type: 'project'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

}
