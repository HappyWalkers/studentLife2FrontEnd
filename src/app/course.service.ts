import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { Course } from "./course";
import { environment } from 'src/environments/environment' 

@Injectable({
  providedIn: 'root'
})
export class CourseService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiServerUrl}/course/find_all`);
    }

    public addCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${this.apiServerUrl}/course/add`, course);
    }

    public updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiServerUrl}/course/update`, course);
    }

    public deleteCourse(courseId: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/course/delete/${courseId}`);
    }
}