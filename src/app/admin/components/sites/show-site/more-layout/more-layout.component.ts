import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-layout',
  templateUrl: './more-layout.component.html',
  styleUrls: ['./more-layout.component.css']
})
export class MoreLayoutComponent implements OnInit {

  showWait: boolean = false;

  fileToUpload: File = null;// hold our file
  imageUrl: string = "";
  originalWidth: string = '';

  constructor(
    private thisDialogRef: MatDialogRef<MoreLayoutComponent>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  openInput() {
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }

  fileChange(files: FileList) {

    if (files.length > 0) {
      this.fileToUpload = files[0];
      var readers = new FileReader();
      readers.onload = (event:any) => {
        this.imageUrl = event.target.result
      }
      readers.readAsDataURL(this.fileToUpload);
      }
  }

  upload() {

    if (!this.fileToUpload) {
      this.toastr.error('Please select a layout.', 'Oops', { timeOut: 5000 });
      return;
    }

    this.showWait = true;

    if(this.data.type === "project"){
      this.adminService.projectImage(this.fileToUpload, this.data.projectId).subscribe((image: any) => {
        if (!image.success) {
          this.fileToUpload = null;
          this.toastr.success('Successfully', 'Layout added.', { timeOut: 5000 });
          this.thisDialogRef.close();
          this.showWait = false;
        }
        else {
          this.toastr.warning('Project was added but image could not be uploaded.', 'Oops', { timeOut: 5000 });
          this.thisDialogRef.close();
          this.showWait = false;
          // this.router.navigate(['/admin/sites/'+ this.data.siteId]);
        }
      });
    }

    if(this.data.type === "site"){
      this.adminService.siteImage(this.fileToUpload, this.data.siteId).subscribe((image: any) => {
        if (!image.success) {
          this.fileToUpload = null;
          this.toastr.success('Successfully', 'Layout added.', { timeOut: 5000 });
          this.thisDialogRef.close();
          this.showWait = false;
        }
        else {
          this.toastr.warning('Project was added but image could not be uploaded.', 'Oops', { timeOut: 5000 });
          this.thisDialogRef.close();
          this.showWait = false;
          // this.router.navigate(['/admin/sites/'+ this.data.siteId]);
        }
      });
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
