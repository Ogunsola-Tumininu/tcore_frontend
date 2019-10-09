import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-processed-appointment',
  templateUrl: './processed-appointment.component.html',
  styleUrls: ['./processed-appointment.component.css']
})
export class ProcessedAppointmentComponent implements OnInit {

  confirmed: any = [];
  conLen: number = 0;

  user: any = {};

  isLoading = true;

  displayedColumns = ['customer', 'site', 'property', 'date', 'status'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.processedAppointment(this.user._id);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  processedAppointment(id) {
    this.userService.getPresentedAppointment(id)
      .subscribe((data: any) => {
        if (data.success) {
          this.confirmed = data.appointments;
          this.conLen = this.confirmed.length;
          console.log(this.confirmed);
          this.dataSource = new MatTableDataSource<any>(this.confirmed);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        }
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
