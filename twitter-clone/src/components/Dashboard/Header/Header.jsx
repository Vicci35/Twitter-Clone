// Header including new post button and settings button
import React from "react";

function DashHeader() {
  return (
    <>
      <div className="header">
        <div id="head-left" className="head-div">
          <h2>Twitter Clone</h2>
        </div>

        <div id="head-mid" className="head-div">
          {/* Get username from local storage or cookies */}
          <h1>Welcome *user*</h1>
        </div>

        <div id="head-right" className="head-div">
          <button>New post</button>
          <button>Settings</button>
        </div>
      </div>
    </>
  );
}

export default DashHeader;
