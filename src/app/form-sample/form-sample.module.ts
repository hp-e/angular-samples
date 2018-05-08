import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSampleRoutingModule } from './form-sample-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormSampleRoutingModule
  ],
  declarations: [UserEditComponent]
})
export class FormSampleModule { }
