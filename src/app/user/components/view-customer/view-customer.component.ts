import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UserService } from 'src/app/services/user.service';
import { EnterAppointmentComponent } from '../enter-appointment/enter-appointment.component';
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer: any = {};
  appointments: any[] = [];
  appointLen: Number = 0;
  role: any  ;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
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
      this.fetchCustomer(routeParams.id);
      this.fetchAppointment(routeParams.id);
      this.role = localStorage.getItem('role');

      // console.log(this.role)
    });
  }


  fetchCustomer(id){
    this.userService.getOneCustomer(id)
      .subscribe((data:any) => {
        if(data.success){
          this.customer = data.customer;

        }
      })
  }

  fetchAppointment(id){
    this.userService.getCustomerAppointment(id)
      .subscribe((data:any) => {
        if(data.success){
          this.appointments = data.appointments;
          // console.log(this.appointments)
        }
      })
  }

  openAddAppointmentDialog(){
    let dialogRef = this.dialog.open(EnterAppointmentComponent, {
      width: '60%',
      data: {
        customer : this.customer,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  editAppointment(appoint){
    let dialogRef = this.dialog.open(EditAppointmentComponent, {
      width: '60%',
      data: {
        customer : this.customer,
        appoint: appoint
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

}
