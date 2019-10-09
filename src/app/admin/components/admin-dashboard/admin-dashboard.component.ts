import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  MatPaginator, MatDialog } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  isLoading = true
  customers: any = {};

  noOfScheduled: number = 0;
  noOfSuccessful: number = 0;
  noOfOffers: number = 0;



  displayedColumns = ['customer', 'site', 'property', 'date', 'status'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchApppointments();
    this.getAllOffer();
    this.getAllScheduledAppointment();
    this.getAllSuccessfulAppointment();
  }

  fetchApppointments(){
    this.adminService.getAppointments()
      .subscribe((data:any[]) => {
        this.customers = data['appointments']
        this.dataSource = new MatTableDataSource<any>(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        // console.log('data requested....');
        // console.log(this.dataSource);
      })
  }

  getAllSuccessfulAppointment(){
    this.adminService.getSuccessfulAppointments()
      .subscribe((data:any[]) => {
        this.noOfSuccessful = data['appointments'].length;
      })
  }

  getAllScheduledAppointment(){
    this.adminService.getScheduledAppointments()
      .subscribe((data:any[]) => {
        this.noOfScheduled = data['appointments'].length;
      })
  }

  getAllOffer(){
    this.adminService.getOffers()
      .subscribe((data:any[]) => {
        this.noOfOffers = data['appointments'].length;
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
