import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.rptpassword == undefined || user.password == undefined || user.username == undefined || user.email == undefined ){
      return false;
    }
    else{
      return true;
    }
  }

  comparePassword(user) {
    if(user.password !== user.confirmPassword ){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhoneno(phone) {
    var re = /^\d{11}$/;
    return re.test(String(phone));
  }

  validatePassword(user) {
    if(user.password !== user.rptpassword ){
      return false;
    }
    else{
      return true;
    }
  }
}
