import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { Position } from '../models/position.interface';
// import { Holiday } from '../models/holiday.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private apiUrl = 'http://localhost:3200/api/positions';

  constructor(private http: HttpClient) { }

  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiUrl}/all-position`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch positions'));
      })
    );
  }

  // Create a new position
  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.apiUrl}/position/create`, position).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to create position'));
      })
    );
  }

  // Update an existing position
  updatePosition(position: Position): Observable<Position> {
    return this.http.put<Position>(`${this.apiUrl}/position/update/${position.id}`, position).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to update position'));
      })
    );
  }

  // Delete a position by ID
  deletePosition(positionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/position/delete/${positionId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to delete position'));
      })
    );
  }

}