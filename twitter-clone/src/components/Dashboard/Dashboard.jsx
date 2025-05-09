// Main page for authenticated user
import React from "react";
import DashHeader from "./Header/Header";
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
          <h3>Posts will be shown here</h3>
        </div>
        {/* MAIN CONTENT END*/}

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
