import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  input: any
  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private Http: Http) { }

  getAllFollowUpUsers() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/users/follow/all', { headers: headers });
  }

  getAllPresenterUsers() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/users/presenter/all', { headers: headers });
  }

  addCustomer(project) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/users/customer/add', JSON.stringify(project), { headers: headers })
  }

  getCustomers() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + '/users/customer/all', { headers: headers });
  }

  getOneCustomer(id): Observable<any> {
    return this.http.get<any>(this.url + '/users/customer/' + id);
  }

  addAppointment(appointment) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + '/users/appointment/add', JSON.stringify(appointment), { headers: headers })
  }

  getCustomerAppointment(cusId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/appointment/customer/' + cusId ,   {headers: headers});
  }

  updateAppointment(appointment){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/users/update/appointment/' + appointment.id, JSON.stringify(appointment), {headers: headers})
  }


  getFollowUpAppointment(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/appointment/follow/' + id ,   {headers: headers});
  }


  getPresenterAppointment(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/appointment/presenter/' + id ,   {headers: headers});
  }

  getAllPresentedAppointment(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/appointment/presenter/presented/' + id ,   {headers: headers});
  }

  confirmAppointment(appointment){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/users/update/appointment/available/confirm/' + appointment.id, JSON.stringify(appointment), {headers: headers})
  }

  getConfirmAppointment(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/appointment/confirmed/' + id ,   {headers: headers});
  }

  getPresentedAppointment(id){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/appointment/presented/' + id ,   {headers: headers});
  }

  presentationReport(report){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/users/appointment/presentation/report/' + report.id , JSON.stringify(report),  {headers: headers});
  }
}
