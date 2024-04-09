import { StudentServiceService } from '../service/student-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../models/Student.model';
import { HttpErrorResponse } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Lecture } from '../models/Lecture.model';
import { LectureService } from '../service/lecture.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; } | undefined;
  constructor(private studentService: StudentServiceService,
    private lectureService: LectureService,
    private fb: FormBuilder,
  ){

  }

  checkoutForm = this.fb.group({
    name: ['',[Validators.required,]],
    surname:[ '',[Validators.required,]],
    email:['', [Validators.required, Validators.email]]
  });

  checkoutFormLecture = this.fb.group({
    name: ['',[Validators.required,]]
  });

  idStudentInUse: number = 0;
  listStudents: Student[] = [];
  message:string = "";
  listLectures: Lecture[] = [];

  selectedLectures: number[] = [];

  ngOnInit(): void {
    this.getAllStudents();

  }


  getAllStudents(): void {
    this.studentService.getAllStudents()
      .subscribe(students => {
        this.listStudents = students;
      });
  }

  findAllLectures(id: number){
    this.lectureService.getUnassignedLecturesByStudent(id)
    .subscribe( lectures => {
      this.listLectures = lectures;
      this.idStudentInUse = id;
    }, );
  }

  isSelected(lectureId: number | null): boolean {
    return this.selectedLectures.includes(lectureId != null? lectureId: 0);
  }


  toggleSelection(lectureId: number | null): void {
    if (this.isSelected(lectureId)) {
      this.selectedLectures = this.selectedLectures.filter(id => id !== lectureId);
    } else {
      this.selectedLectures.push(lectureId != null? lectureId: 0);
    }

    for (let index = 0; index < this.selectedLectures.length; index++) {
      const element = this.selectedLectures[index];
      console.log("Element ", element);

    }
  }



  reload(){
    window.location.reload();
  }

  saveLecturesSelected(){
    this.lectureService.saveLectureAssigned(this.idStudentInUse, this.selectedLectures)
    .subscribe(msn => {
      this.message = msn["message"];
      this.closebutton!.nativeElement.click();
      this.reload();
    },
    (error: HttpErrorResponse) => {
      this.message = error.error.text;
      this.closebutton!.nativeElement.click();
      this.reload();
    }
    );

  }


  deleteStudent(id: number | null): void {
    this.studentService.deleteStudentById(id)
    .subscribe(msn => {
      this.message = msn["message"];
      },
      (error: HttpErrorResponse) => {
        this.message = error.error.text
      }
    );
  }

  saveLecture(){
    if (this.checkoutFormLecture.invalid) {
      return;
    }
    const lectureData = this.checkoutFormLecture.value; // Obtén los valores del formulario
    const newLecture: Lecture = {
      id: null,
      name: lectureData.name || '',
      students: [],
    };

    this.lectureService.saveLecture(newLecture)
      .subscribe(msn => {
        this.message = msn["message"];
        this.closebutton!.nativeElement.click();
        this.reload();
        },
        (error: HttpErrorResponse) => {
          this.message = error.error.text
          this.closebutton!.nativeElement.click();
          this.reload();
        });
  }

  saveStudent(){
    if (this.checkoutForm.invalid) {
      return;
    }

    const studentData = this.checkoutForm.value; // Obtén los valores del formulario
    const newStudent: Student = {
      givenName: studentData.name || '',
      surname: studentData.surname || '',
      email: studentData.email || '',
      id: null,
      lectures: []
    };

    this.studentService.saveStudent(newStudent)
      .subscribe(msn => {
        this.message = msn["message"];
        this.closebutton!.nativeElement.click();
        this.reload();
        },
        (error: HttpErrorResponse) => {
          this.message = error.error.text
          this.closebutton!.nativeElement.click();
          this.reload();
        });

  }



}
