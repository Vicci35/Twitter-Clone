import { useState, useEffect } from "react";
import { getProfileInfo } from "../../../api/userService.js";

function UserProfile({ className, onClose, author, authorId }) {
  const [id, setId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setId(authorId);
  }, [authorId]);

  //   fetch user data user authorID
  useEffect(() => {
    if (!authorId) {
      return;
    }

    async function fetchUserData(id) {
      const data = await getProfileInfo(authorId);
      //   console.log(data);
      setUserData(data);
    }

    fetchUserData(id);
  }, [authorId]);

  if (!userData) {
    return (
      <div className={className}>
        <p>Laddar profil...</p>
        <button onClick={onClose}>Stäng</button>
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        <h1>See user profile</h1>
        <h3>{author}</h3>
        <h4>Name: {userData.name}</h4>
        <h4>Email: {userData.email}</h4>

        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

export default UserProfile;
