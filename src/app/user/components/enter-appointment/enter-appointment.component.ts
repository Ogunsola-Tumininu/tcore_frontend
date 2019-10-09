import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-enter-appointment',
  templateUrl: './enter-appointment.component.html',
  styleUrls: ['./enter-appointment.component.css']
})
export class EnterAppointmentComponent implements OnInit {

  site: any = {};
  projectName: string = '';
  propertyType: string = '';
  viewDate: Date ;
  followUp: any
  remarks: string = '';


  showWait: boolean = false;

  sites: any[] = [];
  projects: any[] = [];
  properties: any[] = [];
  users: any[] = [];
  user: any = {};

  constructor(
    private thisDialogRef: MatDialogRef<EnterAppointmentComponent>,
    private adminService: AdminService,
    private userService: UserService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.fetchSites();
    this.fetchFollowUpUser();
    this.getProfile();
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
      err => {
        console.log(err);
        return false;
      });
  }

  fetchSites() {
    this.adminService.getSites()
      .subscribe((data: any) => {
        this.sites = data.site
      })
  }

  onSiteChange(site) {
    this.adminService.getProjects(site._id)
      .subscribe((data: any) => {
        this.projects = data.projects;
        this.fetchProperty(site._id)
      })
  }

  fetchProperty(id) {
    this.adminService.getPropertyBySiteId(id)
      .subscribe((data: any) => {
        this.properties = data.properties;
      })
  }

  fetchFollowUpUser() {
    this.userService.getAllFollowUpUsers()
      .subscribe((data: any) => {
        this.users = data;
      })
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  createAppointment() {

    if (this.site === "" || this.projectName === "" || this.propertyType === "" || this.remarks === "" || !this.followUp || !this.viewDate) {
      this.toastr.error("Please fill all fields", 'Oops', { timeOut: 3000 });
      return
    }

    let appointment = {
      customer: {
        id: this.data.customer._id,
        name: this.data.customer.name
      },
      site: {
        name: this.site.name,
        _id: this.site._id
      },
      inputter: {
        id: this.user._id,
        name: this.user.name
      },
      project: this.projectName,
      property: this.propertyType,
      viewDate: this.viewDate,
      followUp: {
        _id: this.followUp._id,
        name: this.followUp.name
      },
      remark: this.remarks
    };

    this.showWait = true;

    // console.log(appointment)

    this.userService.addAppointment(appointment).subscribe(data => {
      if (data['success']) {
        this.toastr.success('Successfully', 'Appointment added', { timeOut: 6000 });
        this.showWait = false;

        this.thisDialogRef.close();
      }
      else {
        this.toastr.error(data['msg'], 'Opps', { timeOut: 3000 });
        this.showWait = false;
        this.router.navigate(['register']);
      }
    })

  }

}
