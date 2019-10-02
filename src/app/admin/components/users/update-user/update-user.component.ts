import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userRole: string = "";

  constructor(
    private thisDialogRef: MatDialogRef<UpdateUserComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.userRole = this.data.user.role;
    console.log(this.userRole)
  }



  updateRole() {
    const user = {
      role: this.userRole,
      id: this.data.user._id
    }
    this.adminService.updateRole(user).subscribe((data:any) => {
      if(data.success){
        this.toastr.success('Successfully.', 'The user role has been updated.', { timeOut: 3000 });
      this.thisDialogRef.close();
      }
      else{
        this.toastr.error('Error!!!', 'Something went wrong.', { timeOut: 3000 });
      }

      //location.reload();
    })
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }


}
