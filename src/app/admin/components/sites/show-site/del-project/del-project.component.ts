import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-del-project',
  templateUrl: './del-project.component.html',
  styleUrls: ['./del-project.component.css']
})
export class DelProjectComponent implements OnInit {

  constructor(
    private thisDialogRef: MatDialogRef<DelProjectComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.data.id;
  }

  deleteProject(id) {
    this.adminService.deleteProject(id).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success('Successfully.', 'The Project has been deleted', { timeOut: 3000 });
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
