import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { Role } from '../models/role.interface';
// import { Holiday } from '../models/holiday.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://localhost:3200/api/roles';

  constructor(private http: HttpClient) { }

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/all-role`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch roles'));
      })
    );
  }

  // Create a new role
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/role/create`, role).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to create role'));
      })
    );
  }

  // Update an existing role
  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/role/update/${role.id}`, role).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to update role'));
      })
    );
  }

  // Delete a role by ID
  deleteRole(roleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/role/delete/${roleId}`).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to delete role'));
      })
    );
  }

}