import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private profileUrl = 'http://localhost:8080/api/profile';
  private chatUrl = 'http://localhost:5678/webhook-test/portfolio-chat';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(this.profileUrl);
  }

  sendChatMessage(message: string, sessionId: string): Observable<any> {
    return this.http.post(this.chatUrl, { message, sessionId });
  }
}