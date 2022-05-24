import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListGuard } from './list.guard';
import { ViewComponent } from './view/view.component';
import { CapitalizePipe } from './list/list.component';

@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent,
    ViewComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    ListGuard
  ]
})
export class UsersModule { }
