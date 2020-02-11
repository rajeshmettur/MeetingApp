import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MeetingDetailComponent } from './meeting/meeting-detail/meeting-detail.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AttendeeDetailComponent } from './attendees/attendee-detail/attendee-detail.component';
import { RegisterComponent } from './register/register.component';
import { AttendeeListComponent } from './attendees/attendee-list/attendee-list.component';

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    MeetingDetailComponent,
    MeetingListComponent,
    AttendeeListComponent,
    AttendeeDetailComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
         tokenGetter,
         whitelistedDomains: ['localhost:7000'],
         blacklistedRoutes: ['localhost:7000/api/auth']
      }
   })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
