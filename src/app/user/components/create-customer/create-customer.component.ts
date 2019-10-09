import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  name: string = "";
  email: string = '';
  phoneNumber: string = "";
  address: string = "";

  showWait: boolean = false;

  constructor(
    private thisDialogRef: MatDialogRef<CreateCustomerComponent>,
    private userService: UserService,
    private validateService: ValidateService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    thisDialogRef.disableClose = true;
  }

  ngOnInit() {

  }


  onCloseCancel() {
    this.thisDialogRef.close();
  }

  createCustomer(){
    if(this.name === "" || this.email==="" || this.address==="" || this.phoneNumber===""){
      this.toastr.error("Please fill all fields", 'Oops', { timeOut: 3000 });
      return
    }

    if(!this.validateService.validatePhoneno(this.phoneNumber)){
      this.toastr.error("Please enter 11 digit phone number", 'Oops', { timeOut: 3000 });
      return;
    }

    if(this.email !== ""){
      if(!this.validateService.validateEmail(this.email)){
        this.toastr.error("Please enter a valid email", 'Oops', { timeOut: 3000 });
        return;
      }
    }


    let customer = {
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address
    };

    this.showWait = true;

    this.userService.addCustomer(customer).subscribe(data =>{
      if(data['success']){
        this.toastr.success('Successfully', 'Customer created.', { timeOut: 5000 });
        this.thisDialogRef.close();
        this.showWait = false;
        this.router.navigate(['/user/customer/' + data['customer']._id ])

      }
      else{
        this.toastr.error(data['msg'], 'Something went wrong.', { timeOut: 3000 });
        this.showWait = false;
      }
    })

  }

}
