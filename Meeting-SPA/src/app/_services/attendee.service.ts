import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Attendee } from '../_models/attendee';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

@Injectable({
    providedIn: 'root'
})
export class AttendeeService {
baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

addAttendee(attendee: Attendee) {
    return this.http.post(this.baseUrl + 'attendees/create', attendee, httpOptions);
}

getAttendees(): Observable<Attendee[]> {
   return this.http.get<Attendee[]>(this.baseUrl + 'attendees', httpOptions);
 }

getAttendee(id: string | number): Observable<Attendee> {
    return this.http.get<Attendee>(this.baseUrl + 'attendees/' + id, httpOptions);
  }

updateUser(id: number, attendee: Attendee) {
    return this.http.put(this.baseUrl + 'attendees/' + id, attendee, httpOptions);
  }

deletePhoto(id: number) {
    return this.http.delete(this.baseUrl + 'attendees/' + id, httpOptions);
  }

}
