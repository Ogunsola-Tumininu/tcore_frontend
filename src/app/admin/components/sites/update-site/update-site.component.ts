import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-site',
  templateUrl: './update-site.component.html',
  styleUrls: ['./update-site.component.css']
})
export class UpdateSiteComponent implements OnInit {

  name: string = "";
  location: string = "";

  constructor(
    private thisDialogRef: MatDialogRef<UpdateSiteComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.name = this.data.site.name;
    this.location = this.data.site.location;
  }

  updateSite() {
    const site = {
      name: this.name,
      location: this.location,
      id: this.data.site._id
    }
    this.adminService.updateSite(site).subscribe((data:any) => {
      if(data.success){
        this.toastr.success('Successfully.', 'The site has been updated.', { timeOut: 3000 });
      this.thisDialogRef.close();
      }
      else{
        this.toastr.error('Error!!!', 'Something went wrong.', { timeOut: 3000 });
      }
    })
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }


}
