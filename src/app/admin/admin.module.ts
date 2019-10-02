import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin.component';
import { AdminRouting } from './admin.routing';

import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

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
import 'hammerjs';
import { HttpClientModule } from '@angular/common/http';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UsersComponent } from './components/users/users.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { DelUserComponent } from './components/users/del-user/del-user.component';
import { AdminService } from '../services/admin.service';
import { SitesComponent } from './components/sites/sites.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DelSiteComponent } from './components/sites/del-site/del-site.component';
import { UpdateSiteComponent } from './components/sites/update-site/update-site.component';
import { CreateSiteComponent } from './components/sites/create-site/create-site.component';
import { ShowSiteComponent } from './components/sites/show-site/show-site.component';
import { AddProjectComponent } from './components/sites/add-project/add-project.component';
import { DelProjectComponent } from './components/sites/show-site/del-project/del-project.component';
import { UpdateProjectComponent } from './components/sites/show-site/update-project/update-project.component';
import { ViewProjectComponent } from './components/sites/show-site/view-project/view-project.component';
import { MoreLayoutComponent } from './components/sites/show-site/more-layout/more-layout.component';
import { PropertyComponent } from './components/property/property.component';
import { CreatePropertyComponent } from './components/property/create-property/create-property.component';
import { UploadLayoutComponent } from './components/property/upload-layout/upload-layout.component';
import { Upload3DComponent } from './components/property/upload3-d/upload3-d.component';
import { UploadFloorComponent } from './components/property/upload-floor/upload-floor.component';
import { DelPropertyComponent } from './components/property/del-property/del-property.component';
import { EditPropertyComponent } from './components/property/edit-property/edit-property.component';
import { ViewPropertyComponent } from './components/property/view-property/view-property.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    UsersComponent,
    UpdateUserComponent,
    DelUserComponent,
    SitesComponent,
    CustomersComponent,
    DelSiteComponent,
    UpdateSiteComponent,
    CreateSiteComponent,
    ShowSiteComponent,
    AddProjectComponent,
    DelProjectComponent,
    UpdateProjectComponent,
    ViewProjectComponent,
    MoreLayoutComponent,
    PropertyComponent,
    CreatePropertyComponent,
    UploadLayoutComponent,
    Upload3DComponent,
    UploadFloorComponent,
    DelPropertyComponent,
    EditPropertyComponent,
    ViewPropertyComponent,
    ViewCustomerComponent,
    AdminDashboardComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    CommonModule,
    BrowserAnimationsModule,


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

    AdminRouting,
  ],
  entryComponents: [
    UpdateUserComponent,
    DelUserComponent,
    DelSiteComponent,
    UpdateSiteComponent,
    CreateSiteComponent,
    AddProjectComponent,
    DelProjectComponent,
    UpdateProjectComponent,
    MoreLayoutComponent,
    CreatePropertyComponent,
    UploadLayoutComponent,
    Upload3DComponent,
    UploadFloorComponent,
    DelPropertyComponent,
    EditPropertyComponent,

  ],
  providers: [ValidateService, AuthService, AdminService, AuthGuard],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
