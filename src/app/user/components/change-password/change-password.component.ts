import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;

  oldPassword: String = "";
  password: String = "";
  confirmPassword: String = "";

  showWait: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private validateService: ValidateService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.changePassword = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
    });
  }


  onChangePassword() {

    let user = {
      oldPassword: this.oldPassword,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    // Compare Field
    if (!this.validateService.comparePassword(user)) {
      console.log('Password not matched');
      this.toastr.error('Error sending form', 'Password not matched', { timeOut: 3000 });

      return false;
    }

    // Validate Password Field
    if (!this.validateService.validatePassword(user.password)) {
      console.log('Password not validated');
      this.toastr.error('Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 50.', 'Error sending form', { timeOut: 10000 });

      return false;
    }
    this.showWait = true;
    // Change password
    this.auth.changePassword(user).subscribe(data => {
      if (data['success']) {
        this.toastr.success('Successfully', 'Password Changed', { timeOut: 6000 });
        this.showWait = false;
        let role = localStorage.getItem('role');

        if (role === 'inputter') {
          this.router.navigate(['/user/inputter']);
        }
        else if (role === 'follow_up') {
          this.router.navigate(['/user/followup']);
        }
        else{
          this.router.navigate(['/user/presenter']);
        }
      }
      else {
        this.toastr.error(data['msg'], 'Oops', { timeOut: 3000 });
        this.showWait = false;
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

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirmPassword');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { 'passwordsNotMatching': true };
};
