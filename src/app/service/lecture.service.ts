import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lecture } from '../models/Lecture.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private apiUrl = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }

  public saveLecture(lecture: Lecture): Observable<any> {
    return this.http.post<any>(this.apiUrl+"lecture", lecture);
  }

  public saveLectureAssigned(id: number, lectures: number[]): Observable<any>{
    console.log("aqui");
    return this.http.post<any>(this.apiUrl+"student/"+id+"/lectures", lectures);
}


  public getUnassignedLecturesByStudent(idStudent: number) : Observable<Lecture[]>{
    return this.http.get<Lecture[]>(this.apiUrl+"allUnassignedLecturesByStudentId/"+idStudent)
  }
}
