import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const CLASSROOM_URL: string = '/api/school/class';
const ALL_CLASSROOMS_URL: string = '/all';
const ADD_CLASSROOM_URL: string = '/add';
const UPDATE_CLASSROOM_URL: string = '/update';
const DELETE_CLASSROOM_URL: string = '/delete/';





@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllClassrooms(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}`+CLASSROOM_URL + ALL_CLASSROOMS_URL);
  }

  public addClassroom(classroomVM: any): Observable<any>{
    return this.http.post(`${this.apiServerUrl}`+CLASSROOM_URL + ADD_CLASSROOM_URL, classroomVM)
  }

  public updateClassroom(classroomVM: any): Observable<any>{
    return this.http.put(`${this.apiServerUrl}`+CLASSROOM_URL + UPDATE_CLASSROOM_URL, classroomVM)
  }

  public deleteClassroom(id: number): Observable<any>{
    return this.http.delete(`${this.apiServerUrl}`+CLASSROOM_URL + DELETE_CLASSROOM_URL + id)
  }

}
