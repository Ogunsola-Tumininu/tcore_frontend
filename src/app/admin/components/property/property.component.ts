import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminService } from 'src/app/services/admin.service';
import { DelPropertyComponent } from './del-property/del-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  isLoading = true
  properties: any = {}

  displayedColumns=['name','site', 'project', 'cost', 'actions'];
  dataSource: any;

  mobWidth: any

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
    this.fetchProperties()
  }

  fetchProperties(){
    this.adminService.getProperties()
      .subscribe((data:any) => {
        this.properties = data.properties
        this.dataSource = new MatTableDataSource<any>(this.properties);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        // console.log('data requested....');
        // console.log(this.dataSource);
      })
  }

  fetchSite(id){
    this.adminService.getOneSite(id)
      .subscribe((data:any) => {
        if(data.success){
          return data.site.name;
        }
      })
  }

  openDialog(id){
    let dialogRef = this.dialog.open(DelPropertyComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '40%',
      data: {id : id,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchProperties();
    })
  }

  openUpdatePropertyDialog(property:any){
    let dialogRef = this.dialog.open(EditPropertyComponent, {
      width:(this.mobWidth < 768) ?  '95%' : '60%',
      data: {property: property,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchProperties();
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
