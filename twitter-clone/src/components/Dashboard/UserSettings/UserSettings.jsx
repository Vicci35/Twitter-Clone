import { Link } from "react-router-dom";
import "./SettingStyle.css";

function UserSettings() {
  return (
    <>
      <div id="user-settings">
        <h1>Manage user settings here</h1>

        <Link to={"/dashboard"}>Back</Link>
      </div>
    </>
  );
}

export default UserSettings;
