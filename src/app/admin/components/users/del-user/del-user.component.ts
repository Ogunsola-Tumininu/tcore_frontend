import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrls: ['./del-user.component.css']
})
export class DelUserComponent implements OnInit {

  constructor(
    private thisDialogRef: MatDialogRef<DelUserComponent>,
    private adminService: AdminService,
    private location: Location,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.data.id;
  }

  deleteUser(id) {
    this.adminService.deleteUser(id).subscribe(() => {
      this.toastr.success('Successfully.', 'The User has been deleted', { timeOut: 3000 });
      this.thisDialogRef.close();
      //location.reload();
    })
  }


  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
