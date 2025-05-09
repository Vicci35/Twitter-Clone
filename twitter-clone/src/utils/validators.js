export function passwordMatch(password, repeatPassword) {
  return password === repeatPassword;
}

export function includeSpaces(userdata) {
  return Object.values(userdata).some((value) => value.includes(" "));
}
