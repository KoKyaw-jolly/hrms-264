import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { Staff } from '../models/staff.interface';
// import { Staff } from '../models/staff.interface';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl = 'http://localhost:3200/api/staffs';

  constructor(private http: HttpClient) { }

  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.apiUrl}/all-staff`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch staffs'));
      })
    );
  }

  // Create a new staff
  createStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.apiUrl}/staff/create`, staff).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to create staff'));
      })
    );
  }

  // Update an existing staff
  updateStaff(staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.apiUrl}/staff/update/${staff.id}`, staff).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to update staff'));
      })
    );
  }

  // Delete a staff by Id
  deleteStaff(staffId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/staff/delete/${staffId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to delete staff'));
      })
    );
  }

}