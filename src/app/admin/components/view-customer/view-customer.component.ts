import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customer: any = {};
  appointments: any[] = [];
  appLen: number = 0;
  appointLen: Number = 0;

  constructor(
    private userService: UserService,
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
          this.appLen = this.appointments.length;
          // console.log(this.appointments)
        }
      })
  }


}
