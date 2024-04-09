import { Lecture } from "./Lecture.model";

export class Student {

  id: number | null;
  givenName: string | null;
  surname:string | null;
  email: string | null;
  lectures: Array<Lecture>;

  constructor(
    id: number| null,
    givenName: string| null,
    surname:string| null,
    email: string| null,
    lectures: Array<Lecture>,
  ){
    this.id = id;
    this.givenName = givenName;
    this.surname = surname;
    this.email = email;
    this.lectures = lectures
  }


}
