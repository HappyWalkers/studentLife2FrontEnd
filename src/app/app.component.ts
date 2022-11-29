import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public course_list!: Course[];
  public editCourse: Course | undefined | null;
  public deleteCourse!: Course | null;

  constructor(private courseService: CourseService) {}

  async ngOnInit() {
      await this.getAllCourses();
  }

  public getAllCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: Course[]) => {
        this.course_list = response;
        console.log(this.course_list);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(course: Course | null, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addCourseModal');
    }else if(mode === 'edit') {
      this.editCourse = course;
      button.setAttribute('data-target', '#updateCourseModal');
    }else if(mode === 'delete') {
      this.deleteCourse = course;
      button.setAttribute('data-target', '#deleteCourseModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddCourse(addForm: NgForm): void {
    document.getElementById('add-course-form')?.click();
    this.courseService.addCourse(addForm.value).subscribe({
      next: (response: Course) => {
        console.log(response);
        this.getAllCourses();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }}
    );
  }

  public onUpdateCourse(course: Course): void {
    this.courseService.updateCourse(course).subscribe({
      next: (response: Course) => {
        console.log(response);
        this.getAllCourses();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }}
    );
  }

    public onDeleteCourse(courseId: number | undefined): void {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getAllCourses();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }}
    );
  }

  public searchCourses(key: string): void {
    console.log(key);
    const results: Course[] = [];
    for(const course of this.course_list) {
      if (course.name.toLowerCase().indexOf(key.toLocaleLowerCase()) != -1
      || course.description.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1) {
        results.push(course);
      }
    }
    this.course_list = results;
    if(results.length === 0 || !key) {
      this.getAllCourses();
    }
  }
}
