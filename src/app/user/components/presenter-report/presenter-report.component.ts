import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-presenter-report',
  templateUrl: './presenter-report.component.html',
  styleUrls: ['./presenter-report.component.css']
})
export class PresenterReportComponent implements OnInit {

  customerType: string = "";
  remark: string = "";


  showWait: boolean = false;

  constructor(
    private thisDialogRef: MatDialogRef<PresenterReportComponent>,
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {

  }


  onCloseCancel() {
    this.thisDialogRef.close();
  }

  sendReport(){
    if(this.customerType === "" || this.remark==="" ){
      this.toastr.error("Please fill all fields", 'Oops', { timeOut: 3000 });
      return
    }


    let report = {
      customerType: this.customerType,
      presentionRemark: this.remark,
      id: this.data.appointId
    };

    this.showWait = true;

    this.userService.presentationReport(report).subscribe(data =>{
      if(data['success']){
        this.toastr.success('Successfully', 'Report generated and sent to follow up.', { timeOut: 5000 });
        this.thisDialogRef.close();
        this.showWait = false;

      }
      else{
        this.toastr.error(data['msg'], 'Something went wrong.', { timeOut: 3000 });
        this.showWait = false;
      }
    })

  }

}
