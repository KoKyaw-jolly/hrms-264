import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { Department } from '../models/department.interface';
// import { Holiday } from '../models/holiday.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://localhost:3200/api/departments';

  constructor(private http: HttpClient) { }

  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/all-department`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch departments'));
      })
    );
  }

  // Create a new department
  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/department/create`, department).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to create department'));
      })
    );
  }

  // Update an existing department
  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/department/update/${department.id}`, department).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to update department'));
      })
    );
  }

  // Delete a department by ID
  deleteDepartment(departmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/department/delete/${departmentId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to delete department'));
      })
    );
  }

}