import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from 'src/app/services/admin.service';
import { UpdateSiteComponent } from './update-site/update-site.component';
import { DelSiteComponent } from './del-site/del-site.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  isLoading = true
  sites: any = {}

  displayedColumns=['name','location', 'actions'];
  dataSource: any;

  mobWidth: any;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.mobWidth = (window.screen.width);
   }

  ngOnInit() {
    this.fetchSites()
  }

  fetchSites(){
    this.adminService.getSites()
      .subscribe((data:any) => {
        this.sites = data.site
        this.dataSource = new MatTableDataSource<any>(this.sites);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        // console.log('data requested....');
        // console.log(this.dataSource);
      })
  }

  openDialog(id){
    let dialogRef = this.dialog.open(DelSiteComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '40%',
      data: {id : id,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sites = result;
      this.fetchSites();
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  openUpdateSiteDialog(site:any){
    let dialogRef = this.dialog.open(UpdateSiteComponent, {
      width: (this.mobWidth < 768) ?  '95%' : '60%',
      data: {site : site,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sites = result;
      this.fetchSites();
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
