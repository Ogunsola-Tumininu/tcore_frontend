import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocate-presenter',
  templateUrl: './allocate-presenter.component.html',
  styleUrls: ['./allocate-presenter.component.css']
})
export class AllocatePresenterComponent implements OnInit {

  showWait: boolean = false;
  users: any[] = []

  presenter: any = {};

  constructor(
    private thisDialogRef: MatDialogRef<AllocatePresenterComponent>,
    private adminService: AdminService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.fetchPresenterUser();
  }

  fetchPresenterUser() {
    this.userService.getAllPresenterUsers()
      .subscribe((data: any) => {
        this.users = data;
      })
  }


  confirmAppointment() {

    let appointment = {
      id: this.data.appointId,
      presenter: {
        name: this.presenter.name,
        _id: this.presenter._id
      }

    };

    this.showWait = true;
    // console.log(appointment);

    this.userService.confirmAppointment(appointment).subscribe(data => {
      if (data['success']) {
        this.toastr.success('Successfully', 'Appointment confirmed', { timeOut: 6000 });
        this.showWait = false;
        this.thisDialogRef.close();
      }
      else {
        this.toastr.error(data['msg'], 'Opps', { timeOut: 3000 });
        this.showWait = false;
      }
    })

  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
