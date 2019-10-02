import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email: String;
  password: String;

  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    public toastr: ToastrService,
    private validate: ValidateService,
    private _formBuilder: FormBuilder,
    private location: Location) {

    }

  ngOnInit(): void
  {
      this.loginForm = this._formBuilder.group({
          email   : ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
      });


  }



onLoginSubmit(){
  const user = {
    email: this.email,
    password: this.password
  };


  if(!this.email || !this.password){
    // this.showToast("Please fill all fields to login ");
    this.toastr.error( "Please fill all fields to login ", 'Error!!!',  { timeOut: 5000 } );
    return false;
  }

   // Reguired Email
   if (!this.validate.validateEmail(this.email)){
    this.toastr.error( "Please enter valid email", 'Error!!!',  { timeOut: 5000 } );
    // this.showToast("Please use a valid email");
    return false;
  }

  this.auth.authenticateAdmin(user).subscribe( data => {
    if(data['success']){
      console.log(data['user'])
      this.auth.storeAdminData(data['token'], data['user']);
      // this.toastr.success( 'A place where we help to grow your career.', 'Welcome to Careermeze',  { timeOut: 5000 } );
      this.router.navigate(['/admin']);
    }
    else{
        // this.showToast("Invalid login details.\n " + data['msg'] )
        this.toastr.error( data['msg'], 'Invalid login details.',  { timeOut: 5000 } );
        this.router.navigate(['/admin/login']);

    }
  });
}

}
