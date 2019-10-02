import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  site: any = {};
  projectName: string = '';
  property: string = '';
  viewDate: Date = new Date();
  followUp: any ={};
  remarks: string = '';

  sites: any[] = [];
  projects: any[] = [];
  properties: any[] = [];

  showWait: boolean = false;

  users: any[] = [];

  constructor(
    private thisDialogRef: MatDialogRef<EditAppointmentComponent>,
    private adminService: AdminService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {

    // console.log(this.data.appoint)
    this.site = this.data.appoint.site;
    // console.log(this.site)
    this.projectName = this.data.appoint.project;
    this.property = this.data.appoint.property;
    this.viewDate = this.data.appoint.viewDate;
    this.followUp = this.data.appoint.followUp;
    this.remarks = this.data.appoint.remark;

    this.fetchFollowUpUser();
    this.fetchSites();
    this.fetchProjects(this.site._id);
     this.fetchProperty(this.site._id);
  }

  fetchSites() {
    this.adminService.getSites()
      .subscribe((data: any) => {
        this.sites = data.site
        // this.fetchProperty(this.site.id)
      })
  }

  fetchProjects(id) {
    this.adminService.getProjects(id)
      .subscribe((data: any) => {
        this.projects = data.projects;

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

  updateAppointment() {

    if (!this.site|| this.projectName === "" || this.property === "" || this.remarks === "" || !this.followUp  || !this.viewDate) {
      this.toastr.error("Please fill all fields", 'Oops', { timeOut: 3000 });
      return
    }

    let appointment = {
      id: this.data.appoint._id,
      customer: {
        id: this.data.customer._id,
        name: this.data.customer.name
      },
      site: {
        name: this.site.name,
        _id: this.site._id
      },
      project: this.projectName,
      property: this.property,
      viewDate: this.viewDate,
      followUp: {
        _id: this.followUp._id,
        name: this.followUp.name
      },
      remark: this.remarks
    };

    this.showWait = true;
    // console.log(appointment);

    this.userService.updateAppointment(appointment).subscribe(data => {
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
