// Main page for authenticated user
import React from "react";
import DashHeader from "./Header/Header";
import HomeFeed from "../Home/Home";
import Footer from "./Footer/Footer";
import "./DashStyle.css";

function Dashboard() {
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
>>>>>>> 0e054165ee6d72b9d04d9539351aef242103e341

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
