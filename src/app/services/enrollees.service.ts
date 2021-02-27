import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnrolleesService {
  baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getEnrollees() {
    return this.http.get<API.DenoApp.IdentifiedEnrollee[]>(`${this.baseUrl}enrollees`);
  }

  putEnrollee(id: string, body: API.DenoApp.PutEnrolleeBody) {
    return this.http.put<API.DenoApp.PutEnrolleeBody>(
      `${this.baseUrl}enrollees/${id}`,
      body
    );
  }
}
