import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/Student.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private apiUrl = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl+"allStudents");
  }

  public deleteStudentById(id:number | null): Observable<any>{
    return this.http.delete<any>(this.apiUrl+"deleteStudent/"+id);
  }

  public saveStudent(student: Student): Observable<any> {
    return this.http.post<any>(this.apiUrl+"saveStudent", student);
  }
}
