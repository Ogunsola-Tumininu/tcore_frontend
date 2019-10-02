import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;


  id: String;
  firstname: String;
  lastname: String;
  password: String;
  confirmPassword: String;
  email: String;
  role: string =  "";
  terms: boolean;

  showWait: boolean = false;

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

     }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstname           : ['', Validators.required],
      lastname           : ['', Validators.required],
      email          : ['', [Validators.required, Validators.email]],
      password       : ['', Validators.required],
      role          : ['', Validators.required],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
      terms: '',
       });

    // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('confirmPassword').updateValueAndValidity();
            });
    }


  /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

  onRegisterSubmit(){
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      name: this.firstname + " " + this.lastname,
      email: this.email,
      password: this.password,
      role: this.role,
      confirmPassword: this.confirmPassword
    };

     // Reguired Email
    if (!this.validateService.validateEmail(user.email)){
      console.log('Please use a valid email ');
      this.toastr.error('Error sending form', 'Please use a valid email', { timeOut: 3000 } );
      return false;
    }

     // Reguired role
     if (!this.role){
      console.log('Please use a valid email ');
      this.toastr.error('Error sending form', 'Please use a select a role', { timeOut: 3000 } );
      return false;
    }

     // Compare Field
    if (!this.validateService.comparePassword(user)){
      console.log('Password not matched');
      this.toastr.error('Error sending form', 'Password not matched', { timeOut: 3000 } );

      return false;
    }

    // Validate Password Field
    if (!this.validateService.validatePassword(user.password)){
      console.log('Password not validated');
      this.toastr.error('Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 50.', 'Error sending form', { timeOut: 10000 } );

      return false;
    }

    this.showWait = true;
   // Register User
      this.auth.registerUser(user).subscribe(data => {
      if (data['success']){
        this.toastr.success(data['msg'], 'Registered Successfully', {timeOut: 6000});
        this.showWait = false;
        // console.log(data['user'])
        this.router.navigate(['admin/users']);
      }
      else {
        this.toastr.error(data['msg'], 'Registration Failed', {timeOut: 3000});
        this.showWait = false;
        this.router.navigate(['register']);
      }
    })
  }


}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirmPassword');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {'passwordsNotMatching': true};
};
