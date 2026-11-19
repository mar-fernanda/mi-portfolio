import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(this.apiUrl);
  }
  
}