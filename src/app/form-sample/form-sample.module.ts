import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSampleRoutingModule } from './form-sample-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormSampleRoutingModule
  ],
  declarations: [UserEditComponent],
  exports: [UserEditComponent]
})
export class FormSampleModule { }
