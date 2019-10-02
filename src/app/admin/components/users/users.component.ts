import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DelUserComponent } from './del-user/del-user.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading = true
  users: any = {}

  displayedColumns=['name','email','role', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchUsers()
  }

  fetchUsers(){
    this.adminService.getUsers()
      .subscribe((data:any[]) => {
        this.users = data
        this.dataSource = new MatTableDataSource<any>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        // console.log('data requested....');
        // console.log(this.dataSource);
      })
  }

  openDialog(id){
    let dialogRef = this.dialog.open(DelUserComponent, {
      width: '60%',
      data: {id : id,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.users = result;
      this.fetchUsers();
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  openUpdateUserDialog(user:any){
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '60%',
      data: {user : user,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.users = result;
      this.fetchUsers();
      //console.log(`Dialog Closed: ${result}`);
      //this.dialogResult = result;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
