const API_URL = "http://localhost:3000/api/users/register";

// Send new user data to server
export async function saveNewUser(userData) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await resp.json();

  if (data.inputError) {
    return { error: data.inputError };
  }

  if (data.signupError) {
    return { error: data.signupError };
  }

  return data;
}

// Update user info
export async function updateUserInfo(updatedInfo) {
  console.log("This will be sent to the server:", updatedInfo);

  const resp = await fetch("http://localhost:3000/api/users/update-info", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedInfo),
  });

  const data = await resp.json();
  console.log(data);

  return data;
}
