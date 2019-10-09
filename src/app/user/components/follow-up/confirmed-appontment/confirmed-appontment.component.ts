import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmed-appontment',
  templateUrl: './confirmed-appontment.component.html',
  styleUrls: ['./confirmed-appontment.component.css']
})
export class ConfirmedAppontmentComponent implements OnInit {
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
      this.confirmedAppointment(this.user._id);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  confirmedAppointment(id) {
    this.userService.getConfirmAppointment(id)
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
