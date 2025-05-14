import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateInfoForm from "./updateForm";
import "./SettingStyle.css";

function UserSettings() {
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState({
    memberSince: "",
    name: "",
    nickname: "",
    email: "",
    hometown: "",
    about: "",
    occupation: "",
    website: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUserInfo({
        memberSince: userData.createdAt,
        name: userData.name,
        nickname: userData.nickname,
        email: userData.email,
        hometown: userData.hometown,
        about: userData.about,
        occupation: userData.occupation,
        website: userData.website,
      });
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Inte inloggad");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        console.error(err);
        navigate("/login/password");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <div id="user-settings">
        <>
          {userData ? (
            <div>
              <h1>Manage user settings here</h1>
              <div>
                <UpdateInfoForm
                  name={userInfo.name}
                  nickname={userInfo.nickname}
                  email={userInfo.email}
                  hometown={userInfo.hometown}
                  about={userInfo.about}
                  occupation={userInfo.occupation}
                  website={userInfo.website}
                />
              </div>
            </div>
          ) : (
            <div>
              <h2>Loading...</h2>
              <i className="fa-solid fa-spinner fa-xl"></i>
            </div>
          )}
        </>

        <Link to={"/dashboard"} id="to-dash">
          &larr; Back
        </Link>
      </div>
    </>
  );
}

export default UserSettings;
