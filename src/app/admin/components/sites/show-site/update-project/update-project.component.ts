import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  name: string = "";
  type: string = "";
  types: any[] = [];

  constructor(
    private thisDialogRef: MatDialogRef<UpdateProjectComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.name = this.data.project.name;
    this.types = this.data.project.type;
  }

  addType() {
    let check = this.types.find(type => type == this.type);
    if (!check) {
      this.types.push(this.type);
      this.type = "";
    }
    else{
      this.toastr.error('Type already exist.', 'Oops', { timeOut: 3000 });
    }
  }

  removeType(type) {
    console.log('click')
    let types = this.types
    for (let i = 0; i < types.length; i++) {
      if (types[i] == type) {
        types.splice(i, 1);
        this.toastr.success('Successfully.', 'Type removed from list', { timeOut: 3000 });
      }
    }
  }

  updateProject() {
    const project = {
      name: this.name,
      type: this.types,
      id: this.data.project._id
    }
    this.adminService.updateProject(project).subscribe((data:any) => {
      if(data.success){
        this.toastr.success('Successfully.', 'The project has been updated.', { timeOut: 3000 });
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
