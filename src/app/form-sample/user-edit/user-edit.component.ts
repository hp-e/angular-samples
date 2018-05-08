import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../models/user-data';
import { CustomValidators } from '../../shared/custom-validators';

// import 


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userTypes: string[] = [
    'Admin',
    'Superuser',
    'Superduperuser',
    'Baduser'
  ]
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.editForm = this.formBuilder.group({
      id: [-1, [Validators.required]],
      name: [undefined, [Validators.required]],
      userName: [undefined, [Validators.required]],
      userType: ['Baduser'],
      email: [undefined, [Validators.required, Validators.email]],
      comment: undefined,
      birthId: [undefined, [CustomValidators.birthIdValidator, Validators.required]]
    });
  }
  resetForm() {
    if (this.editForm) {
      this.editForm.reset();
    }

  }
  onDataRetrieved(data: UserData) {
    this.resetForm();

    this.editForm.patchValue({
      id: data.id,
      name: data.name,
      userName: data.username,
      comment: data.comment,
      userType: data.userType,
      email: data.email,
      birthId: data.birthId
    });
  }

  // pnr er generert her: http://prag.matisk.com/ssn/

  getUserData() {
    const data: UserData = {
      id: 1,
      name: 'test testesen',
      username: 'tasty007',
      email: 'test@testesen.no',
      userType: 'Superuser',
      birthId: '05057547571'
    };

    this.onDataRetrieved(data);
  }

  save() {
    console.log('save');
  }
}
