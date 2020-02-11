import { Component, OnInit } from '@angular/core';
import { AttendeeService } from '../../_services/attendee.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/_models/attendee';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.css']
})
export class AttendeeListComponent implements OnInit {
  attendee: Attendee[];
  constructor(public attendeeService: AttendeeService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.attendeeService.getAttendees().subscribe(res => this.attendee = res as Attendee[]);
    console.log('attendeelist' + this.attendee) ;
  }

  deleteAttendee(id: number) {
    this.alertify.confirm('Are you sure you want to delete this attendee?', () => {
      this.attendeeService.deletePhoto(id).subscribe(() => {
        this.attendee.splice(this.attendee.findIndex(p => p.id === id), 1);
        this.alertify.success('Attendee has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Attendee');
      });
    });
    }
}
