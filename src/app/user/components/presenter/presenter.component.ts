import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AllocatePresenterComponent } from '../allocate-presenter/allocate-presenter.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PresenterReportComponent } from '../presenter-report/presenter-report.component';

@Component({
  selector: 'app-presenter',
  templateUrl: './presenter.component.html',
  styleUrls: ['./presenter.component.css']
})
export class PresenterComponent implements OnInit {

  user: any = {};
  confirmed: any[] = []
  conLen: number = 0

  isLoading = true;

  displayedColumns = ['customer', 'site', 'property', 'date', 'status'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.confirmRole();
    this.getProfile();
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.scheduledAppointment(this.user._id);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  confirmRole(){
    let role = localStorage.getItem('role');

    if(role === 'inputter' ){
      this.router.navigate(['/user/inputter']);
    }
    else if(role === 'follow_up' ){
      this.router.navigate(['/user/followup']);
    }
  }

  scheduledAppointment(id){
    this.userService.getPresenterAppointment(id)
      .subscribe((data:any) => {
        if(data.success){
          this.confirmed = data.appointments;
          this.conLen = this.confirmed.length;
          console.log(this.confirmed)
          this.dataSource = new MatTableDataSource<any>(this.confirmed);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        }
      })
  }

  openReportDialog(id){
    let dialogRef = this.dialog.open(PresenterReportComponent, {
      width: '90%',
      data: {
        appointId: id
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();

      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

}
