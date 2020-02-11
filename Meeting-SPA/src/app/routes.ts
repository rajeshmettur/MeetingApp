import { Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { MeetingDetailComponent } from './meeting/meeting-detail/meeting-detail.component';
import { AttendeeDetailComponent } from './attendees/attendee-detail/attendee-detail.component';
import { AttendeeListComponent } from './attendees/attendee-list/attendee-list.component';

export const appRoutes: Routes = [
    {path : 'home', component : HomeComponent},
    {
        path : '',
        runGuardsAndResolvers : 'always',
        canActivate : [AuthGuard],
        children : [
           {path : 'meetings', component : MeetingListComponent},
           {path : 'meeting', children : [
            {path : '', component : MeetingDetailComponent},
            {path : 'edit/:id', component : MeetingDetailComponent}
           ] },
           {path : 'attendees', component : AttendeeListComponent},
           {path : 'attendee', children : [
            {path : '', component : AttendeeDetailComponent},
            {path : 'edit/:id', component : AttendeeDetailComponent}
           ] },
        ]
    },
    {path : '**', redirectTo : 'home', pathMatch : 'full'}
];
