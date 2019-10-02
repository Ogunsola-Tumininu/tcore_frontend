import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-del-property',
  templateUrl: './del-property.component.html',
  styleUrls: ['./del-property.component.css']
})
export class DelPropertyComponent implements OnInit {

  constructor(
    private thisDialogRef: MatDialogRef<DelPropertyComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.data.id;
  }

  deleteProperty(id) {
    this.adminService.deleteProperty(id).subscribe((data: any) => {
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
