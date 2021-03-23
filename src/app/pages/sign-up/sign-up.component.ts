import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationService } from "src/app/services/validation.service";

import { Api } from "src/app/providers/api";
import { Router } from "@angular/router";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent {
  isFormFilled: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: Api,
    private validationService: ValidationService
  ) {
    this.signupForm = formBuilder.group(
      {
        firstName: [
          "",
          Validators.compose([
            Validators.pattern(
              this.validationService.firstAndLastNameRegexPattern
            ),
            Validators.minLength(1),
            Validators.required,
          ]),
        ],
        lastName: [
          "",
          Validators.compose([
            Validators.pattern(
              this.validationService.firstAndLastNameRegexPattern
            ),
            Validators.minLength(1),
            Validators.required,
          ]),
        ],
        email: [
          "",
          Validators.compose([
            Validators.pattern(this.validationService.emailRegexPattern),
            Validators.required,
          ]),
        ],
        password: [
          "",
          Validators.compose([
            Validators.pattern(this.validationService.passwordRegexPattern),
            Validators.required,
          ]),
        ],
      },
      {
        validators: this.validationService.passwordMatchValidator,
      }
    );
  }

  submitForm() {
    this.postToServer(
      this.signupForm.controls.firstName.value,
      this.signupForm.controls.lastName.value,
      this.signupForm.controls.email.value
    );
  }

  postToServer(firstName: string, lastName: string, email: string) {
    const requestBody: User = {
      firstName,
      lastName,
      email,
    };

    this.api.post("users", requestBody).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        this.resetSignUpForm(this.signupForm);
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      },
      (err) => {
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2000);
      }
    );
  }

  resetSignUpForm(form: FormGroup): void {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
    form.controls["firstName"].setErrors(null);
    form.controls["lastName"].setErrors(null);
    form.controls["email"].setErrors(null);
    form.controls["password"].setErrors(null);
  }
}
