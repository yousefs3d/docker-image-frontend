import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const STUDENT_URL: string = '/api/school/student';
const ALL_STUDENTS_URL: string = '/all';
const STUDENT_CLASSROOMS_URL: string = '/classrooms/';
const ADD_STUDENT_URL: string = '/add';
const UPDATE_STUDENT_URL: string = '/update';
const DELETE_STUDENT_URL: string = '/delete/';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}`+STUDENT_URL + ALL_STUDENTS_URL);
  }

  public getStudentClassrooms(studentId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}`+STUDENT_URL + STUDENT_CLASSROOMS_URL + studentId);
  }

  public addStudent(studentVM: any): Observable<any>{
    return this.http.post(`${this.apiServerUrl}`+STUDENT_URL + ADD_STUDENT_URL, studentVM)
  }

  public updateStudent(studentVM: any): Observable<any>{
    return this.http.put(`${this.apiServerUrl}`+STUDENT_URL + UPDATE_STUDENT_URL, studentVM)
  }

  public deleteStudent(id: number): Observable<any>{
    return this.http.delete(`${this.apiServerUrl}`+STUDENT_URL + DELETE_STUDENT_URL + id)
  }

}
