import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Attendee } from '../../_models/attendee';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { AttendeeService } from '../../_services/attendee.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {
  model: any = {};
  meetingForm: FormGroup;
  public attendee: Attendee[];
  bsConfig: Partial<BsDatepickerConfig>;
  constructor( private authService: AuthService,
               private attendeeService: AttendeeService,
               private router: Router,
               private alertify: AlertifyService,
               private fb: FormBuilder,
               private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    this.attendeeService.getAttendees().subscribe(res => {
      this.attendee = res as Attendee[];
    }, error => console.error(error));
    this.bsConfig = {
      containerClass: 'theme-red'
    };

    const attendeeID: string = this.currentRoute.snapshot.paramMap.get('id');
    if (attendeeID == null) {
      this.createMeetingForm();
    }
    // else{
    //   this.attendeeService.getAttendee(attendeeID).subscribe(res => {
    //     this.meetingForm = this.fb.group({
    //       attendeename: res.attendeeName });
    //   });
    // }

  }

  createMeetingForm() {
    this.meetingForm = this.fb.group({
      attendeename: ['', Validators.required]});
  }

}
