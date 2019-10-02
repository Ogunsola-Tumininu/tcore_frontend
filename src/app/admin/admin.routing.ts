import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from '../guards/admin-auth.guard.';
import { UsersComponent } from './components/users/users.component';
import { SitesComponent } from './components/sites/sites.component';
import { CreateSiteComponent } from './components/sites/create-site/create-site.component';
import { ShowSiteComponent } from './components/sites/show-site/show-site.component';
import { ViewProjectComponent } from './components/sites/show-site/view-project/view-project.component';
import { PropertyComponent } from './components/property/property.component';
import { ViewPropertyComponent } from './components/property/view-property/view-property.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: AdminDashboardComponent, canActivate:[AdminAuthGuard]},
            { path: 'users', component: UsersComponent, canActivate:[AdminAuthGuard] },
            { path: 'customers', component: CustomersComponent, canActivate:[AdminAuthGuard] },
            { path: 'customer/:id', component: ViewCustomerComponent, canActivate:[AdminAuthGuard]  },
            { path: 'sites', component: SitesComponent, canActivate:[AdminAuthGuard] },
            { path: 'create/site', component: CreateSiteComponent, canActivate:[AdminAuthGuard] },
            { path: 'site/:id', component: ShowSiteComponent, canActivate:[AdminAuthGuard] },
            { path: 'project/:id', component: ViewProjectComponent, canActivate:[AdminAuthGuard] },
            { path: 'properties', component: PropertyComponent, canActivate:[AdminAuthGuard] },
            { path: 'property/:id', component: ViewPropertyComponent, canActivate:[AdminAuthGuard]},

        ]
    }
];

export const AdminRouting = RouterModule.forRoot(routes);
