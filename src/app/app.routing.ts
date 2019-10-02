import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    // { path: '', redirectTo: '/user', pathMatch: 'full'},
    // {path:'register', component: RegisterComponent},
];

export const routing = RouterModule.forRoot(routes);
