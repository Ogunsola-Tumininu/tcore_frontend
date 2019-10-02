import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user : any=  '';
  role: any = "";
  constructor(
    public auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
     ) { }

     ngOnInit() {
      this.user = localStorage.getItem('user');
      this.role = localStorage.getItem('role');
     }

  onLogoutClick(){
    this.auth.logout();
    this.toastr.info('Thanks for visiting' ,'You have logged out of your account',  { timeOut: 3000 } );
    this.router.navigate(['/login']);
    this.user = null;
    return false
  }
}
