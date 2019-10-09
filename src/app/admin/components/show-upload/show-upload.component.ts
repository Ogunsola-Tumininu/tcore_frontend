import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-upload',
  templateUrl: './show-upload.component.html',
  styleUrls: ['./show-upload.component.css']
})
export class ShowUploadComponent implements OnInit {

  constructor(
    private thisDialogRef: MatDialogRef<ShowUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.data;
    console.log(this.data)
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
