import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AllocatePresenterComponent } from '../allocate-presenter/allocate-presenter.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
  user: any = {};
  appointments: any[] = [];
  confirmed: any[] = [];
  appLen: number = 0;
  conLen: number = 0;

  isLoading = true;

  displayedColumns = ['customer', 'site', 'property', 'date', 'status'];
  dataSource: any;

  mobWidth: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.mobWidth = (window.screen.width);
  }

  ngOnInit() {
    this.confirmRole();
    this.getProfile();
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.fetchAppointment(this.user._id);
      this.confirmedAppointment(this.user._id);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  fetchAppointment(id) {
    this.userService.getFollowUpAppointment(id)
      .subscribe((data: any) => {
        if (data.success) {
          this.appointments = data.appointments;
          this.appLen = this.appointments.length;
          this.dataSource = new MatTableDataSource<any>(this.appointments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
          // console.log(this.appointments)
        }
      })
  }

  confirmRole() {
    let role = localStorage.getItem('role');

    if (role === 'inputter') {
      this.router.navigate(['/user/inputter']);
    }
    else if (role === 'presenter') {
      this.router.navigate(['/user/presenter']);
    }
  }

  confirmedAppointment(id) {
    this.userService.getConfirmAppointment(id)
      .subscribe((data: any) => {
        if (data.success) {
          this.confirmed = data.appointments;
          this.conLen = this.confirmed.length;
        }
      })
  }

  allocatePresenter(appId) {
    let dialogRef = this.dialog.open(AllocatePresenterComponent, {
      width: (this.mobWidth < 768) ?  '95%' : '60%',
      data: {
        appointId: appId
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


}
