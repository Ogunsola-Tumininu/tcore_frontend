import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';


import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule,} from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';


import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { routing } from './app.routing';
import { LoginComponent } from './login/login.component';

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
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoginGuard } from './guards/login.guard';
import { AdminLoginGuard } from './guards/admin-login.guard';
import { HttpAuthInterceptor } from './guards/http-route.interceptor';




export function tokenGetter() {
  return localStorage.getItem('token');
}



const appRoutes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path:'admin/login', component: AdminLoginComponent, canActivate:[AdminLoginGuard]},

]

// C:\Program Files\MySQL\MySQL Shell 8.0\bin\


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLoginComponent,
    RegisterComponent,

  ],

  imports: [
    UserModule,
    AdminModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width'
    }),
    CommonModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:10255', 'localhost:4200','meanstacklinux.azurewebsites.net' ],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),

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

  ],
  providers: [ ValidateService, AuthService, AuthGuard,
    {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthInterceptor,
            multi: true
        }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
