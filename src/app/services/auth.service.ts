import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders, HttpClient } from '@angular/common/http';
//import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any
  usertype: any;

  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  registerUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`${this.url}/users/register`, user, { headers: headers })
  }


  authenticateUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(`${this.url}/users/authenticate`, user, { headers: headers })
  }

  authenticateAdmin(admin) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.url + '/adminusers/authenticate', admin, { headers: headers })
  }

  getProfile() {
    this.loadToken()
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authToken })
    return this.http.get(this.url + '/users/profile', { headers: headers })
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token
  }

  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

  isUser() {
    return !!localStorage.getItem('user');
  }

  isAdmin() {
    return !!localStorage.getItem('admin');
  }

  isMgt() {
    return !!localStorage.getItem('mgt');
  }



  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    // localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id);
    localStorage.setItem('role', user.role);
    localStorage.setItem('user', user.type);
    this.authToken = token;
    this.user = user;
  }

  storeAdminData(token, user) {
    localStorage.setItem('id_token', token);
    // localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id);
    localStorage.setItem('role', user.role);
    localStorage.setItem('type', user.type);
    if(user.role === "admin"){
      localStorage.setItem('admin', user.role);
    }
    else{
      localStorage.setItem('mgt', user.role);
    }
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  ngOnInit() {
    const token: string = localStorage.getItem('token');
    this.jwtHelper.isTokenExpired(token);
  }





}
