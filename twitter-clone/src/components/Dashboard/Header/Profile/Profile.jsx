import { useUser } from "../../../../utils/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./profile.css";

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login/password");
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>; // Visa något medan det redirectas
  }

  return (
    <>
      <h1>Profile</h1>
      <div id="profile">
        Profile picture
        <span>
          <b>Info:</b> User Info
        </span>
        <span>
          <b>Info:</b> User Info
        </span>
        <span>
          <b>Info:</b> User Info
        </span>
        <span>
          <b>Info:</b> User Info
        </span>
        <span>
          <b>Info:</b> User Info
        </span>
        <span>
          <b>Info:</b> User Info
        </span>
      </div>
      <Link to="/dashboard">&larr; Back</Link>
    </>
  );
}

export default Profile;
