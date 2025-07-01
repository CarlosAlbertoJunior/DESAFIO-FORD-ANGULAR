import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000', {
      username: username,
      password: password
    })

  }
}
