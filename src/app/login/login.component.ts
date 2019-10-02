import { Component, OnInit } from '@angular/core';

import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  user: any = {};

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

  this.auth.authenticateUser(user).subscribe( data => {
    if(data['success']){
      this.auth.storeUserData(data['token'], data['user']);
      this.user = data['user']
      // this.toastr.success( 'A place where we help to grow your career.', 'Welcome to Careermeze',  { timeOut: 5000 } );
      if(this.user.role === 'inputter' ){
        this.router.navigate(['/user/inputter']);
      }
      else if(this.user.role === 'presenter' ){
        this.router.navigate(['/user/presenter']);
      }
      else if(this.user.role === 'follow_up' ){
        this.router.navigate(['/user/followup']);
      }

    }
    else{
        // this.showToast("Invalid login details.\n " + data['msg'] )
        this.toastr.error( data['msg'], 'Invalid login details.',  { timeOut: 5000 } );
        this.router.navigate(['/login']);

    }
  });
}

}
