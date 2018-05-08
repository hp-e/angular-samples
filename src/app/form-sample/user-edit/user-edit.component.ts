import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { UserData } from "../../models/user-data";
import { CustomValidators } from "../../shared/custom-validators";

// import

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styles: []
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userTypes: string[] = ["Admin", "Superuser", "Superduperuser", "Baduser"];

  totalCharsAllowed = 140;
  charCount = 0;

  get usernameControl() { return this.editForm.get('username'); }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.editForm = this.formBuilder.group({
      id: [-1, [Validators.required]],
      name: [undefined, [Validators.required]],
      username: [undefined, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
      userType: ["Baduser"],
      email: [undefined, [Validators.required, Validators.email]],
      comment: [undefined, [Validators.required, Validators.maxLength(this.totalCharsAllowed)]],
      birthId: [
        undefined,
        [CustomValidators.birthIdValidator, Validators.required]
      ]
    });

    this.editForm.get('comment').valueChanges.subscribe(
      value => {
        console.log('Comment changed to: ', value);
        this.charCount = value === null || value === undefined ? 0 : value.length;
      }
        );
  }
  
  resetForm() {
    if (this.editForm) {
      this.editForm.reset();
      this.editForm.patchValue({
        id: -1
      });
    }

    this.charCount = 0;
  }
  onDataRetrieved(data: UserData) {
    this.resetForm();

    this.editForm.patchValue({
      id: data.id,
      name: data.name,
      username: data.username,
      comment: data.comment,
      userType: data.userType,
      email: data.email,
      birthId: data.birthId
    });

    this.charCount = data.comment !== undefined ? data.comment.length :  0;
  }

  // pnr er generert her: http://prag.matisk.com/ssn/

  getUserData() {
    const data: UserData = {
      id: 1,
      name: "test testesen",
      username: "tasty007",
      email: "test@testesen.no",
      userType: "Superuser",
      birthId: "05057547571"
    };

    this.onDataRetrieved(data);
  }

  save() {
    const item: UserData = Object.assign({}, this.editForm.value);

    if (item.id > 0) {
      this.update(item);
    } else {
      this.create(item);
    }
  }

  update(item: UserData) {
    console.log("update: ", item);

    item.id = 2;

    this.onDataRetrieved(item);
  }

  create(item: UserData) {
    console.log("create: ", item);

    // api kall for å oppdatere...
    item.id = 2;

    this.onDataRetrieved(item);
  }
}
