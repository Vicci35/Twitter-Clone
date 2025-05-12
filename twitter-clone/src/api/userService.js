const API_URL = "http://localhost:3000/api/users/register";

// Send new user data to server
export async function saveNewUser(userData) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  // if (!resp.ok) {
  //   throw new Error("HTTP error");
  // }

  const data = await resp.json();

  if (data.inputError) {
    return { error: data.inputError };
  }

  if (data.signupError) {
    return { error: data.signupError };
  }

  return data;
}
