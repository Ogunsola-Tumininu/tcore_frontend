import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserComponent } from './user.component';
import { AuthGuard } from '../guards/auth.guard';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { PresenterComponent } from './components/presenter/presenter.component';


const routes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            // { path: '', component: DashbordComponent },
            { path: 'inputter', component: DashbordComponent, canActivate:[AuthGuard] },
            { path: 'customer/:id', component: ViewCustomerComponent, canActivate:[AuthGuard] },
            { path: 'followup', component: FollowUpComponent, canActivate:[AuthGuard] },
            { path: 'presenter', component: PresenterComponent, canActivate:[AuthGuard] },

        ]
    }
];

export const UserRouting = RouterModule.forRoot(routes);
