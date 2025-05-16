// Main page for authenticated user
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import DashHeader from "./Header/Header";
import HomeFeed from "../Home/Home";
import Footer from "./Footer/Footer";
import "./DashStyle.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
    }
  }, [user]);

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
        setUser(data.user);
      } catch (err) {
        console.error(err);
        navigate("/login/password");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      {user ? (
        <div id="dash-main-div">
          {/* HEADER */}
          <DashHeader userName={user.nickname} />

          {/* MAIN CONTENT START */}
          <div id="dash-content">
            <HomeFeed />
            {/* <h3>Posts will be shown here</h3> */}
          </div>
          {/* MAIN CONTENT END

            {/* FOOTER */}
          <Footer />
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
          <i className="fa-solid fa-spinner fa-xl"></i>
        </div>
      )}
    </>
  );
}

export default Dashboard;
