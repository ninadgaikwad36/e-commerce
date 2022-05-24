import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './users/add/add.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ReleaseGuard } from './auth/release.guard';
import { AuthorizationGuard } from './auth/authorization.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard,AuthorizationGuard],
        data:{'role' : ['SuperAdmin','Admin','User']},
    },
    {
      path: 'login',
      component: LoginComponent,
      canDeactivate:[ReleaseGuard]
    },
    {
      path: 'register',
      component: RegisterComponent
    }
    // 
    //     path: 'users/list',
    //     component: ListComponent
    // },
    // {
    //     path: 'users/add',
    //     component: AddComponent
    // },
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }