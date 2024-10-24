import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { LeaveRecord } from '../models/leave.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:3200/api/leaves';

  constructor(private http: HttpClient) { }

  applyLeavea(leaveRecord: LeaveRecord): Observable<LeaveRecord> {
    return this.http.post<LeaveRecord>('http://localhost:3200/api/leave/apply-leave', leaveRecord);
  }
  //apply leave

  applyLeave(leaveRecord: LeaveRecord): Observable<LeaveRecord> {
    return this.http.post<LeaveRecord>(`${this.apiUrl}/apply-leave`, leaveRecord).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to apply leave'));
      })
    );
  }

  getAllLeaveRecords(): Observable<LeaveRecord[]> {
    return this.http.get<LeaveRecord[]>(`${this.apiUrl}/leave-records/all-leave-record`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch leave records'));
      })
    );
  }

  getUserLeaveRecord(staffId: string): Observable<LeaveRecord[]> {
    return this.http.get<LeaveRecord[]>(`${this.apiUrl}/leave-record/${staffId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch leave records'));
      })
    );
  }

  // getLeaveReportData(filterData: any): Observable<LeaveRecord[]> {
  //   console.log(filterData);
  //   return this.http.get<LeaveRecord[]>('http://localhost:3200/api/leave/leave-report', {
  //     params: filterData
  //   });
  // }

  // getLeaveCalendar(): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:3200/api/leave/leave-calendar/all');
  // }

  // approveRejectLeave(leaveRecord: LeaveRecord, approveRejectStatus: string): Observable<LeaveRecord> {
  //   if (approveRejectStatus === 'approve') {
  //     return this.http.post<LeaveRecord>('http://localhost:3200/api/leave/apporve-reject-leave', leaveRecord);
  //   } else {
  //     return this.http.post<LeaveRecord>('http://localhost:3200/api/leave/apporve-reject-leave', leaveRecord);
  //   }
  // }
}