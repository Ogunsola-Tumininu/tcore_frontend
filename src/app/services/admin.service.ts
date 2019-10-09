import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  input: any
  url = 'http://localhost:8080';
  // url = "";

  constructor(
    private http: HttpClient,
    private Http: Http) { }

  getUsers(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/users/all',   {headers: headers});
  }

  deleteUser(id: any) {
    return this.http.delete(this.url +'/users/delete/' + id);
  }

  updateRole(user){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/users/update/role/' + user.id, JSON.stringify(user), {headers: headers})
  }

  getSites(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/site/all',   {headers: headers});
  }

  getOneSite(id): Observable<any>{
    return this.http.get<any>(this.url +'/adminusers/site/' + id);
  }

  addSite(site){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/adminusers/site/add', JSON.stringify(site), {headers: headers})
  }

  updateSite(site){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/adminusers/update/site/' + site.id, JSON.stringify(site), {headers: headers})
  }

  deleteSite(id: any) {
    return this.http.delete(this.url +'/adminusers/delete/site/' + id);
  }

  public siteImage(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/adminusers/site/upload/' + id, formData)
  }

  addProject(project){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/adminusers/project/add', JSON.stringify(project), {headers: headers})
  }

  public projectImage(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/adminusers/project/upload/' + id, formData)
  }

  getProjects(siteId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/site/' + siteId + '/project',   {headers: headers});
  }

  getProjectsBySiteNme(siteName){
    let site = {
      siteName: siteName
    }
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/adminusers/site/name/project', site, {headers: headers});
  }


  getTypes(projectName){
    let site ={
      name: projectName
    }
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/adminusers/site/project/type', site, {headers: headers});
  }

  getOneProject(id): Observable<any>{
    return this.http.get<any>(this.url +'/adminusers/project/' + id);
  }

  updateProject(project){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/adminusers/update/project/' + project.id, JSON.stringify(project), {headers: headers})
  }

  deleteProject(id: any) {
    return this.http.delete(this.url +'/adminusers/delete/project/' + id);
  }

  addProperty(project){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url +'/adminusers/property/add', JSON.stringify(project), {headers: headers})
  }

  getProperties(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/property/all',   {headers: headers});
  }

  getOneProperty(id): Observable<any>{
    return this.http.get<any>(this.url +'/adminusers/property/' + id);
  }

  updateProperty(property){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url +'/adminusers/update/property/' + property.id, JSON.stringify(property), {headers: headers})
  }

  deleteProperty(id: any) {
    return this.http.delete(this.url +'/adminusers/delete/property/' + id);
  }

  getPropertyBySiteId(siteId){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/site/' + siteId + '/property',   {headers: headers});
  }

  public propertyFloor(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/adminusers/property/upload/floor/' + id, formData)
  }

  public property3d(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/adminusers/property/upload/d/' + id, formData)
  }

  public propertyLayout(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/adminusers/property/upload/layout/' + id, formData)
  }

  getAppointments(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/appointments' ,   {headers: headers});
  }

  getSuccessfulAppointments(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/appointments/successful' ,   {headers: headers});
  }

  getScheduledAppointments(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/appointments/scheduled' ,   {headers: headers});
  }

  getOffers(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url +'/adminusers/appointments/offer' ,   {headers: headers});
  }

}
