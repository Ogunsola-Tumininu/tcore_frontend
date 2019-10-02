import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {

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
    private thisDialogRef: MatDialogRef<CreatePropertyComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.fetchSites()
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
      })
  }

  onProjectChange(proName) {
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
      name: this.name,
      site: {
        siteId: this.site._id,
        siteName: this.site.name
      },
      project_name: this.project_name,
      project_type: this.project_type,
      house_type: this.house_type,
      unit: this.unit,
      cost: this.cost
    };

    this.showWait = true;

    this.adminService.addProperty(property).subscribe(data =>{
      if(data['success']){
        this.toastr.success('Successfully', 'Property added.', { timeOut: 5000 });
        this.thisDialogRef.close();
        this.showWait = false;
        this.router.navigate(['/admin/property/' + data['property']._id ])

      }
      else{
        this.toastr.error(data['msg'], 'Something went wrong.', { timeOut: 3000 });
        this.showWait = false;
      }
    })

  }

}
