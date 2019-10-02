import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-del-site',
  templateUrl: './del-site.component.html',
  styleUrls: ['./del-site.component.css']
})
export class DelSiteComponent implements OnInit {

  constructor(
    private thisDialogRef: MatDialogRef<DelSiteComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.data.id;
  }

  deleteSite(id) {
    this.adminService.deleteSite(id).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success('Successfully.', 'The Site has been deleted', { timeOut: 3000 });
        this.thisDialogRef.close();
      }
      else {
        this.toastr.error('Something went wrong.', 'Error!!!', { timeOut: 3000 });
      }

      //location.reload();
    })
  }


  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
