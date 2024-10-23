import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { StaffType } from '../../models/master/staff-type.interface';
// import { Holiday } from '../models/holiday.interface';

@Injectable({
  providedIn: 'root'
})
export class StaffTypeService {

  private apiUrl = 'http://localhost:3200/api/staff-types';

  constructor(private http: HttpClient) { }

  getAllStaffType(): Observable<StaffType[]> {
    return this.http.get<StaffType[]>(`${this.apiUrl}/all-staff-type`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch staff-types'));
      })
    );
  }

  // Create a new staff type
  createStaffType(staffType: StaffType): Observable<StaffType> {
    return this.http.post<StaffType>(`${this.apiUrl}/staff-type/create`, staffType).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to create staff type'));
      })
    );
  }

  // Update an existing staff type
  updateStaffType(staffType: StaffType): Observable<StaffType> {
    console.log(staffType.id);
    return this.http.put<StaffType>(`${this.apiUrl}/staff-type/update/${staffType.id}`, staffType).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to update staff type'));
      })
    );
  }

  // Delete a staff type by ID
  deleteStaffType(staffTypeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/staff-type/delete/${staffTypeId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to delete staff type'));
      })
    );
  }

}