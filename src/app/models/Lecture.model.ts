import { Student } from "./Student.model";

export class Lecture{

  id: number | null;
  name: string | null;
  students:Array<Student>;

  constructor(
    id: number | null,
    name: string | null,
    students:Array<Student>,
  ){
    this.id = id;
    this.name = name;
    this.students = students
  }
}
