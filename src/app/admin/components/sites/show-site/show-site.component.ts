import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';;

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { AddProjectComponent } from '../add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { DelProjectComponent } from './del-project/del-project.component';
import { MoreLayoutComponent } from './more-layout/more-layout.component';

import * as M from './../../../../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-show-site',
  templateUrl: './show-site.component.html',
  styleUrls: ['./show-site.component.css']
})
export class ShowSiteComponent implements OnInit {

  site: any = {};

  isLoading = true
  projects: any = {}

  displayedColumns=['name','type', 'actions'];
  dataSource: any;

  // for crousel
  options = {fullWidth: true};

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) { }

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
      this.fetchSite(routeParams.id);

    });

    // crousel variable
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, this.options);

  }

  fetchSite(id){
    this.adminService.getOneSite(id)
      .subscribe((data:any) => {
        if(data.success){
          this.site = data.site;
          this.fetchProjects();

          console.log(this.site)
        }
      })
  }

  openAddProjectDialog(){
    let dialogRef = this.dialog.open(AddProjectComponent, {
      width: '60%',
      data: {siteId : this.site._id,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  fetchProjects(){
    this.adminService.getProjects(this.site._id)
      .subscribe((data:any) => {
        this.projects = data.projects
        this.dataSource = new MatTableDataSource<any>(this.projects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;

        // crousel variable
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, this.options);
        // console.log('data requested....');
        // console.log(this.dataSource);
      })
  }

  openDialog(id){
    let dialogRef = this.dialog.open(DelProjectComponent, {
      width: '60%',
      data: {id : id,
        }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  openUpdateProjectDialog(project:any){
    let dialogRef = this.dialog.open(UpdateProjectComponent, {
      width: '60%',
      data: {project : project,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openMoreLayoutDialog(){
    let dialogRef = this.dialog.open(MoreLayoutComponent, {
      width: '60%',
      data: {
        siteId : this.site._id,
        type:'site'
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

}
