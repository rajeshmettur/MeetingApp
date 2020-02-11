/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttendeeService } from './attendee.service';

describe('Service: Attendee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendeeService]
    });
  });

  it('should ...', inject([AttendeeService], (service: AttendeeService) => {
    expect(service).toBeTruthy();
  }));
});
