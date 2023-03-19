import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Classroom } from '../model/classroom';
import { Student } from '../model/student';
import { ClassroomService } from '../service/classroom.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  first = 0;
  rows = 10;
  students: Student[] = [];
  classrooms: Classroom[] = [];
  display: boolean = false;
  showStudentDetails: boolean = false;
  studentDetails: any;
  studentClassrooms: any;
  studentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    classroomIds: new FormControl([])
  });
  updateStudentForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    classroomIds: new FormControl([])
  })

  readonly ID: string = 'id';
  readonly NAME: string = 'name';
  readonly EMAIL: string = 'email';
  readonly MOBILE: string = 'mobile';
  readonly CLASSROOM_IDS: string = 'classroomIds';


  constructor(
    private studentService: StudentService,
    private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
    this.getAllStudentsAndClassrooms();
  }

  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe(res => {
      this.students = res;
    });
  }

  getAllStudentsAndClassrooms(): void {
    let students = this.studentService.getAllStudents();
    let classrooms = this.classroomService.getAllClassrooms();
    forkJoin([students, classrooms]).subscribe(result => {
      this.students = result[0];
      this.classrooms = result[1];
      this.classrooms.map(classroom => {
        classroom.label = classroom.room.concat('-').concat(classroom.building);
      });
    });
  }

  getStudentFormControl(formControlName: string): any {
    return this.studentForm.get(formControlName);
  }

  getUpdateStudentFormControl(formControlName: string): any {
    return this.updateStudentForm.get(formControlName);
  }

  clearForm(): void {
    this.getStudentFormControl(this.NAME).setValue(null);
    this.getStudentFormControl(this.EMAIL).setValue(null);
    this.getStudentFormControl(this.MOBILE).setValue(null);
    this.getStudentFormControl(this.CLASSROOM_IDS).setValue(null);
  }

  addStudent(): void {
    this.studentService.addStudent(this.studentForm?.value).subscribe(res => {
      this.getAllStudents();
      this.clearForm();
    });
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.updateStudentForm?.value).subscribe(res => {
      this.getAllStudents();
      this.display = false;
    })
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(res => {
      this.getAllStudents();
    })
  }

  showDialog(student: any): void {
    this.getUpdateStudentFormControl(this.ID).setValue(student.id);
    this.getUpdateStudentFormControl(this.NAME).setValue(student.name);
    this.getUpdateStudentFormControl(this.EMAIL).setValue(student.email);
    this.getUpdateStudentFormControl(this.MOBILE).setValue(student.mobile);
    this.display = true;
  }

  displayStudentDetails(student: any): void {
    this.studentDetails = student;
    this.studentService.getStudentClassrooms(this.studentDetails.id).subscribe(res => {
      this.studentClassrooms = res;
      this.showStudentDetails = true;
    });
  }

  closeStudentDetails(): void{
    this.showStudentDetails = false;
  }

  next(): void {
    this.first = this.first + this.rows;
  }

  prev(): void {
    this.first = this.first - this.rows;
  }

  reset(): void {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.students ? this.first === (this.students.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.students ? this.first === 0 : true;
  }

}
