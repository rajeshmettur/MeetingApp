import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Attendee } from '../../_models/attendee';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { AttendeeService } from '../../_services/attendee.service';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee-detail.component.html',
  styleUrls: ['./attendee-detail.component.css']
})
export class AttendeeDetailComponent implements OnInit {
  @Output() cancelAttendee = new EventEmitter();
  model: any = {};
  attendeeForm: FormGroup;
  attendee: Attendee;
  constructor( private authService: AuthService,
               private attendeeService: AttendeeService,
               private router: Router,
               private alertify: AlertifyService,
               private fb: FormBuilder,
               private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    const attendeeID: string = this.currentRoute.snapshot.paramMap.get('id');
    if (attendeeID == null) {
      this.createAttendeeForm();
    } else {
      this.attendeeService.getAttendee(attendeeID).subscribe(res => {
        this.attendeeForm = this.fb.group({
          attendeename: res.attendeeName });
      });
    }
  }

  createAttendeeForm() {
    this.attendeeForm = this.fb.group({
      attendeename: ['', Validators.required]});
  }

  AddAttendee() {
    if (this.attendeeForm.valid) {
    this.attendee = Object.assign({}, this.attendeeForm.value);
    this.attendeeService.addAttendee(this.attendee).subscribe(() => {
      this.alertify.success('attendee added successful');
      this.router.navigate(['/attendees']);
    }, error => { this.alertify.error(error); }
    );
  }
}

  cancel() {
    this.attendeeForm.reset();
    this.cancelAttendee.emit(false);
    this.router.navigate(['/attendees']);
  }
}
