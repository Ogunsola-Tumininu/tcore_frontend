import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  isLoading = true
  customers: any = {}

  user: any = {};

  displayedColumns=['name','email','phone', 'address'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.confirmRole();
    this.fetchUsers();
  }

  fetchUsers(){
    this.userService.getCustomers()
      .subscribe((data:any[]) => {
        this.customers = data['customers']
        this.dataSource = new MatTableDataSource<any>(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        // console.log('data requested....');
        // console.log(this.dataSource);
      })
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
      err => {
        console.log(err);
        return false;
      });
  }

  confirmRole(){
    let role = localStorage.getItem('role');

    if(role === 'presenter' ){
      this.router.navigate(['/user/presenter']);
    }
    else if(role === 'follow_up' ){
      this.router.navigate(['/user/followup']);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
