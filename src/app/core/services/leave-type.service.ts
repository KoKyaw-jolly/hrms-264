import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { LeaveType } from '../models/leave-type.interface';
// import { Holiday } from '../models/holiday.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {

  private apiUrl = 'http://localhost:3200/api/leave-types';

  constructor(private http: HttpClient) { }

  getAllLeaveType(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(`${this.apiUrl}/all-leave-type`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch leave-types'));
      })
    );
  }

  // Create a new leave type
  createLeaveType(leaveType: LeaveType): Observable<LeaveType> {
    return this.http.post<LeaveType>(`${this.apiUrl}/leave-type/create`, leaveType).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to create leave type'));
      })
    );
  }

  // Update an existing leave type
  updateLeaveType(leaveType: LeaveType): Observable<LeaveType> {
    console.log(leaveType.id);
    return this.http.put<LeaveType>(`${this.apiUrl}/leave-type/update/${leaveType.id}`, leaveType).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to update leave type'));
      })
    );
  }

  // Delete a leave type by ID
  deleteLeaveType(leaveTypeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/leave-type/delete/${leaveTypeId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to delete leave type'));
      })
    );
  }

}