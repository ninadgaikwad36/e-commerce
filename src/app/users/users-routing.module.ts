import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { ListGuard } from './list.guard';
import { AuthorizationGuard } from '../auth/authorization.guard';

const routes: Routes = [
  {
      path: 'users/list',
      component: ListComponent,
      canActivate:[AuthGuard,AuthorizationGuard],
      data:{'role' : ['SuperAdmin','Admin']},
      resolve:{'users':ListGuard}
  },
  {
      path: 'users/add',
      component: AddComponent,
      data:{'role' : ['SuperAdmin']},
      canActivate:[AuthGuard,AuthorizationGuard]
  },
  {
      path: 'users/edit/:id',
      component: EditComponent,
      data:{'role' : ['SuperAdmin']},
      canActivate:[AuthGuard,AuthorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
