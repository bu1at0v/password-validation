import { TestBed } from "@angular/core/testing";
import { testStringForContainingAnotherString } from "./utils";

describe("ValidationService", () => {
  let testStringMethod: Function;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [testStringForContainingAnotherString],
    });
    testStringMethod = testStringForContainingAnotherString;
  });

  it("should be created", () => {
    expect(testStringMethod).toBeTruthy();

    expect(testStringMethod("Peter123", "Peter")).toBeTrue();
    expect(testStringMethod("Peter123", "PETER")).toBeTrue();
    expect(testStringMethod("Pe1ter123", "1")).toBeTrue();

    expect(testStringMethod("Pe1ter123", "Peter")).toBeFalse();
  });
});
