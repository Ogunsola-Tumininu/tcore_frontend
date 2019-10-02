import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  name: string = "";
  site: any = {};
  project_name: string = '';
  project_type: string = "";
  unit: string = "";
  cost: string = "";
  house_type: '';

  showWait: boolean = false;

  sites: any[] = [];
  projects: any[] = [];
  types: any[] = [];

  constructor(
    private thisDialogRef: MatDialogRef<EditPropertyComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.fetchSites();
    this.name = this.data.property.name,
    this.site = this.data.property.site,
    this.loadProject(this.site);
    this.project_name = this.data.property.project_name,
    this.project_type = this.data.property.project_type,
    this.loadType(this.project_name);
    this.house_type = this.data.property.house_type,
    this.unit = this.data.property.unit,
    this.cost = this.data.property.cost
  }

  fetchSites() {
    this.adminService.getSites()
      .subscribe((data: any) => {
        this.sites = data.site
      })
  }

  loadProject(site) {
    this.adminService.getProjects(site.siteId)
      .subscribe((data: any) => {
        this.projects = data.projects;
      })
  }

  onProjectChange(proName) {
    this.adminService.getTypes(proName)
      .subscribe((data: any) => {
        this.types = data.projects;
      })
  }

  loadType(proName) {
    this.adminService.getTypes(proName)
      .subscribe((data: any) => {
        this.types = data.projects;
      })
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  createProperty(){
    if(this.name === "" || this.site==="" || this.project_type==="" || this.project_type===""
     || this.house_type==="" || this.unit==="" || this.cost===""){
      this.toastr.error("Please fill all fields", 'Oops', { timeOut: 3000 });
      return
    }

    let property = {
      id: this.data.property._id,
      name: this.name,
      site: this.data.property.site,
      project_name: this.project_name,
      project_type: this.project_type,
      house_type: this.house_type,
      unit: this.unit,
      cost: this.cost
    };

    this.showWait = true;

    this.adminService.updateProperty(property).subscribe(data =>{
      if(data['success']){
        this.toastr.success('Successfully', 'Project updated.', { timeOut: 5000 });
        this.thisDialogRef.close();
        this.showWait = false
      }
      else{
        this.toastr.error(data['msg'], 'Something went wrong.', { timeOut: 3000 });
        this.showWait = false;
      }
    })

  }

}
