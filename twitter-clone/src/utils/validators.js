export function validatePhone(phone) {
  return /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/.test(phone);
}

export function passwordMatch(password, repeatPassword) {
  return password === repeatPassword;
}
