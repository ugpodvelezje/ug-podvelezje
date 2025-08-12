import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://podvelezje.ba/api/send-email.php';

  constructor(private http: HttpClient) {}

  sendEmail(formData: ContactFormData): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.apiUrl, formData);
  }
}