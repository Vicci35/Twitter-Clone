// Main page for authenticated user
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashHeader from "./Header/Header";
import HomeFeed from "../Home/Home";
import Footer from "./Footer/Footer";
import "./DashStyle.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

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
      <div id="dash-main-div">
        {/* HEADER */}
        <DashHeader />

        {/* MAIN CONTENT START */}
        <div id="dash-content">
          <HomeFeed />
          {/* <h3>Posts will be shown here</h3> */}
        </div>
        {/* MAIN CONTENT END

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
