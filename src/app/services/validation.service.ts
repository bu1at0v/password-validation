import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { testStringForContainingAnotherString } from "../utils/utils";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  firstAndLastNameRegexPattern: RegExp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;
  emailRegexPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRegexPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,30}$/;

  constructor() {}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password: string | undefined = control.get("password")?.value;
    const firstName: string | undefined = control.get("firstName")?.value;
    const lastName: string | undefined = control.get("lastName")?.value;

    let passwordPassedValidation: boolean;

    if (
      !testStringForContainingAnotherString(password, firstName) &&
      !testStringForContainingAnotherString(password, lastName)
    ) {
      passwordPassedValidation = true;
    } else {
      passwordPassedValidation = false;
    }

    return passwordPassedValidation ? null : { passwordError: true };
  }
}
