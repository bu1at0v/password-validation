export const testStringForContainingAnotherString = (
  stringContaining: string,
  testString: string
): boolean => {
  if (!stringContaining || !testString) {
    return false;
  }

  if (
    stringContaining.toLocaleLowerCase().indexOf(testString.toLowerCase()) ===
    -1
  ) {
    return false;
  } else {
    return true;
  }
};
