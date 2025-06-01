export function passwordMatch(password, repeatPassword) {
  return password === repeatPassword;
}

export function isStrongPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
}

export function includeSpaces(inputValue) {
  return inputValue.includes(" ");
}
