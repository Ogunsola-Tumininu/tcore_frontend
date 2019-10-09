import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  user = {}
  constructor(
    public auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user')
    console.log(this.user)
  }

  onNavClick() {
    let nav = document.getElementById('tog').click();

  }

  onLogoutClick() {
    this.auth.logout();
    this.toastr.info('Thanks for visiting', 'You have logged out of your account', { timeOut: 3000 });
    this.router.navigate(['/admin/login']);
    this.user = null;
    return false
  }


}
