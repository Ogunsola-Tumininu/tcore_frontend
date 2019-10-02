import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRouting } from './user.routing';
import {  UserComponent } from './user.component'


import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';

import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatOptionModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatStepperModule,
  MatDatepickerModule,
  MatTabsModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatRadioModule,
} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import 'hammerjs';

import { DashbordComponent } from './components/dashbord/dashbord.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { UserService } from '../services/user.service';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { EnterAppointmentComponent } from './components/enter-appointment/enter-appointment.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { AllocatePresenterComponent } from './components/allocate-presenter/allocate-presenter.component';
import { PresenterComponent } from './components/presenter/presenter.component';
import { PresenterReportComponent } from './components/presenter-report/presenter-report.component';
import { ConfirmedAppontmentComponent } from './components/follow-up/confirmed-appontment/confirmed-appontment.component';
import { ProcessedAppointmentComponent } from './components/follow-up/processed-appointment/processed-appointment.component';
import { PresentedAppointmentComponent } from './components/presenter/presented-appointment/presented-appointment.component';





@NgModule({
  declarations: [
    UserComponent,
    DashbordComponent,
    NavbarComponent,
    CreateCustomerComponent,
    ViewCustomerComponent,
    EnterAppointmentComponent,
    EditAppointmentComponent,
    FollowUpComponent,
    AllocatePresenterComponent,
    PresenterComponent,
    PresenterReportComponent,
    ConfirmedAppontmentComponent,
    ProcessedAppointmentComponent,
    PresentedAppointmentComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UserRouting,

    // Material
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSortModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatTabsModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatRadioModule,
    MatMomentDateModule

  ],
  entryComponents: [
    CreateCustomerComponent,
    EnterAppointmentComponent,
    EditAppointmentComponent,
    AllocatePresenterComponent,
    PresenterReportComponent
  ],
  providers: [ValidateService, AuthService, UserService, AuthGuard,],
  bootstrap: []
})
export class UserModule { }
