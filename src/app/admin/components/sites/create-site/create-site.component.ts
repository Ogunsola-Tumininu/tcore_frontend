import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent implements OnInit {

  name: string = '';
  location: string = '';

  showWait: boolean = false;

  fileToUpload: File = null;// hold our file
  imageUrl: string = "";
  originalWidth: string = '';

  constructor(
    private thisDialogRef: MatDialogRef<CreateSiteComponent>,
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
    // const fileName = files[0].name;
    // const reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (event: any) => {
    //   const img = new Image();
    //   img.src = event.target.result;
    //   this.imageUrl = img.src;
    //   img.onload = () => {
    //     const elem = document.createElement('canvas');
    //     var height = img.height;
    //     var width  = img.width;

    //     elem.width = width;
    //     elem.height = height;
    //     const ctx = elem.getContext('2d');
    //     // img.width and img.height will give the original dimensions
    //     ctx.drawImage(img, 0, 0, width, height);
    //     ctx.canvas.toBlob((blob) => {
    //       this.fileToUpload = new File([blob], fileName, {
    //         type: 'image/jpeg',
    //         lastModified: Date.now()
    //       });
    //     }, 'image/jpeg', 1);

    //   },
    //     reader.onerror = error => console.log(error);

    //   //console.log(files[0]);
    // };
  }

  upload() {
    // console.log('sending this to server', this.fileToUpload)

    if (this.name === "") {
      this.toastr.error('Please enter the site name.', 'Oops', { timeOut: 5000 });
      return;
    }

    if (this.location === "") {
      this.toastr.error('Please enter the site location.', 'Oops', { timeOut: 5000 });
      return;
    }

    this.showWait = true;

    let site = {
      name: this.name,
      location: this.location
    }

    this.adminService.addSite(site).subscribe(data => {
      if (data['success']) {

        if (this.fileToUpload) {
          this.adminService.siteImage(this.fileToUpload, data['site']._id).subscribe((image: any) => {
            if (!image.success) {
              this.fileToUpload = null;
              this.toastr.success('Successfully', 'Site added.', { timeOut: 5000 });
              this.thisDialogRef.close();
              this.showWait = false;
              this.router.navigate(['/admin/sites']);
            }
            else {
              this.toastr.warning('Site was added but image could not be uploaded.', 'Oops', { timeOut: 5000 });
              this.showWait = false;
            }
          });
        }
      }
      else {
        this.toastr.error(data['msg'], 'Something went wrong.', { timeOut: 3000 });
        this.showWait = false;
        //this.thisDialogRef.close();
        // this.router.navigate(['/user/career']);
      }
    })

  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
