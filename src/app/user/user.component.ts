import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { AuthService } from '../services/auth.service';

@Component({

  templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})
export class UserComponent {

  user: any = {};
  role: any = "";

  constructor(
    private dialog: MatDialog,
    private auth: AuthService
  ){}

  ngOnInit(){
    this.getProfile();
    this.role = localStorage.getItem('role');
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      // console.log(this.user)
    },
      err => {
        console.log(err);
        return false;
      });
  }

  createCustomer(){
    let dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

}
