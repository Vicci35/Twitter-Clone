export function passwordMatch(password, repeatPassword) {
  return password === repeatPassword;
}

export function includeSpaces(inputValue) {
  return inputValue.includes(" ");
}
