// Send new user data to server
export async function saveNewUser(userData) {
  const { name, username, email, password, repeatPassword } = userData;
  console.log("Name:", name);
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Repeat password:", repeatPassword);
}
