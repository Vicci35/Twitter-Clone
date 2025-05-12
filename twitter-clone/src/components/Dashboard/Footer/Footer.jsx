import React from "react";
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <>
      <div id="dash-footer">
        <p id="copyright">{`Twitter Clone ${currentYear}`}</p>
        <p id="devs">Devs: Victoria, Sebastian, VT, Oliver</p>
      </div>
    </>
  );
}

export default Footer;
