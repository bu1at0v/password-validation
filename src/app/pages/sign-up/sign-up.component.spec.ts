import { HttpClient, HttpHandler } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Api } from "src/app/providers/api";

import { SignUpComponent } from "./sign-up.component";

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let httpMock: HttpTestingController;
  let api: Api;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [Api, HttpClient, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    api = TestBed.get(Api);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render input elements", () => {
    const compiled = fixture.debugElement.nativeElement;
    const firstNameInput = compiled.querySelector('input[id="firstName"]');
    const lastNameInput = compiled.querySelector('input[id="lastName"]');
    const emailInput = compiled.querySelector('input[id="email"]');
    const passwordInput = compiled.querySelector('input[id="password"]');
    const submitButton = compiled.querySelector('button[id="submitForm"]');

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it("should test button disabled", () => {
    const form = component.signupForm;
    expect(form.valid).toBeFalsy();

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;
    const submitButton = fixture.debugElement.nativeElement.querySelector(
      'button[id="submitForm"]'
    );

    expect(submitButton.disabled).toBeTruthy();

    firstNameInput.setValue("John");
    lastNameInput.setValue("Peterson");
    emailInput.setValue("john.peterson@gmail.com");
    passwordInput.setValue("Peterson123");

    expect(form.valid).toBeFalsy();
    expect(submitButton.disabled).toBeTruthy();
  });

  it("should test button enabled", () => {
    const form = component.signupForm;

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;
    const submitButton = fixture.debugElement.nativeElement.querySelector(
      'button[id="submitForm"]'
    );

    expect(form.valid).toBeFalsy();
    expect(submitButton.disabled).toBeTruthy();

    firstNameInput.setValue("John");
    lastNameInput.setValue("Peterson");
    emailInput.setValue("john.peterson@gmail.com");
    passwordInput.setValue("qweQWE123");

    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    expect(submitButton.disabled).toBeFalsy();
  });

  it("should test form validity", () => {
    const form = component.signupForm;
    expect(form.valid).toBeFalsy();

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    firstNameInput.setValue("John");
    lastNameInput.setValue("Peterson");
    emailInput.setValue("john.peterson@gmail.com");
    passwordInput.setValue("qweQWE123");

    expect(form.valid).toBeTruthy();

    passwordInput.setValue("Peterson123");
    fixture.detectChanges();

    expect(form.valid).toBeFalsy();
  });

  it("should test input validity", () => {
    const form = component.signupForm;

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    expect(firstNameInput.valid).toBeFalsy();
    expect(lastNameInput.valid).toBeFalsy();
    expect(emailInput.valid).toBeFalsy();
    expect(passwordInput.valid).toBeFalsy();

    firstNameInput.setValue("John");
    expect(firstNameInput.valid).toBeTruthy();

    lastNameInput.setValue("Peterson");
    expect(firstNameInput.valid).toBeTruthy();

    emailInput.setValue("john.peterson@gmail.com");
    expect(firstNameInput.valid).toBeTruthy();

    passwordInput.setValue("qweQWE123");
    expect(passwordInput.valid).toBeTruthy();
  });

  it("should test first name input errors", () => {
    const form = component.signupForm;

    const firstNameInput = form.controls.firstName;

    expect(firstNameInput.errors.required).toBeTruthy();

    firstNameInput.setValue("John Peter");
    expect(firstNameInput.errors).toBeNull();

    firstNameInput.setValue("");
    expect(firstNameInput.errors).toBeTruthy();

    firstNameInput.setValue("123");
    expect(firstNameInput.errors).toBeTruthy();

    firstNameInput.setValue("la la");
    expect(firstNameInput.errors).toBeNull();
  });

  it("should test last name input errors", () => {
    const form = component.signupForm;

    const lastNameInput = form.controls.lastName;

    lastNameInput.setValue("John Peter");
    expect(lastNameInput.errors).toBeNull();

    lastNameInput.setValue("");
    expect(lastNameInput.errors).toBeTruthy();

    lastNameInput.setValue("123");
    expect(lastNameInput.errors).toBeTruthy();

    lastNameInput.setValue("la la");
    expect(lastNameInput.errors).toBeNull();
  });

  it("should test email input errors", () => {
    const form = component.signupForm;

    const emailInput = form.controls.email;

    expect(emailInput.errors.required).toBeTruthy();

    emailInput.setValue("JohnPeter@gmail.com");
    expect(emailInput.errors).toBeNull();

    emailInput.setValue("");
    expect(emailInput.errors).toBeTruthy();

    emailInput.setValue("JohnPeter@gmail.");
    expect(emailInput.errors).toBeTruthy();

    emailInput.setValue("JohnPeter@gmail-com");
    expect(emailInput.errors).toBeTruthy();
  });

  it("should test password input errors", () => {
    const form = component.signupForm;

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const passwordInput = form.controls.password;

    firstNameInput.setValue("John");
    lastNameInput.setValue("Peter");

    passwordInput.setValue("");
    expect(passwordInput.errors.required).toBeTruthy();

    passwordInput.setValue("123123-Q");
    expect(passwordInput.errors).toBeTruthy();

    passwordInput.setValue("qweQWE123");
    expect(passwordInput.errors).toBeNull();

    passwordInput.setValue("qweQWE123");
    expect(passwordInput.errors).toBeNull();

    passwordInput.setValue("JohnqweQWE123");
    expect(form.errors.passwordError).toBeTruthy();

    passwordInput.setValue("PetertqweQWE123");
    expect(form.errors.passwordError).toBeTruthy();
  });

  it("should call submitForm on button click", fakeAsync(() => {
    const form = component.signupForm;

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    firstNameInput.setValue("John");
    lastNameInput.setValue("Peter");
    emailInput.setValue("JohnPeter@gmail.com");
    passwordInput.setValue("qweQWE123");

    fixture.detectChanges();

    spyOn(component, "submitForm");

    let button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();
    tick();
    expect(component.submitForm).toHaveBeenCalled();
  }));

  it("should call postToServer on submit form", fakeAsync(() => {
    const form = component.signupForm;

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    firstNameInput.setValue("John");
    lastNameInput.setValue("Peter");
    emailInput.setValue("JohnPeter@gmail.com");
    passwordInput.setValue("qweQWE123");

    fixture.detectChanges();

    spyOn(component, "postToServer");

    let button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    tick();

    expect(component.postToServer).toHaveBeenCalledWith(
      "John",
      "Peter",
      "JohnPeter@gmail.com"
    );
  }));

  it("should clear form", () => {
    const form = component.signupForm;

    const firstNameInput = form.controls.firstName;
    const lastNameInput = form.controls.lastName;
    const emailInput = form.controls.email;
    const passwordInput = form.controls.password;

    firstNameInput.setValue("John");
    lastNameInput.setValue("Peter");
    emailInput.setValue("JohnPeter@gmail.com");
    passwordInput.setValue("JohnPeter1");

    fixture.detectChanges();
    expect(form.valid).toBeFalsy();

    component.resetSignUpForm(form);

    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    expect(firstNameInput.value).toBe(null);
    expect(lastNameInput.value).toBe(null);
    expect(emailInput.value).toBe(null);
    expect(passwordInput.value).toBe(null);
  });
});
