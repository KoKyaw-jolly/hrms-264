import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { Holiday } from '../models/holiday.interface';
// import { Holiday } from '../models/holiday.interface';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private apiUrl = 'http://localhost:3200/api/holidays';

  constructor(private http: HttpClient) { }

  getAllHoliday(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.apiUrl}/all-holiday`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch holidays'));
      })
    );
  }

  // Create a new holiday
  createHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(`${this.apiUrl}/holiday/create`, holiday).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to create holiday'));
      })
    );
  }

  // Update an existing holiday
  updateHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.put<Holiday>(`${this.apiUrl}/holiday/update/${holiday.id}`, holiday).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to update holiday'));
      })
    );
  }

  // Delete a holiday by ID
  deleteHoliday(holidayId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/holiday/delete/${holidayId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to delete holiday'));
      })
    );
  }

}