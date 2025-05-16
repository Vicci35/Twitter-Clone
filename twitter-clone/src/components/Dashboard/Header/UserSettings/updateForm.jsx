import { useState, useEffect } from "react";
import { updateUserInfo } from "../../../../api/userService.js";

function UpdateInfoForm({
  id,
  name,
  nickname,
  email,
  hometown,
  about,
  occupation,
  website,
}) {
  const [updatedInfo, setUpdatedInfo] = useState({
    changeName: name,
    changeNick: nickname,
    changeMail: email,
    hometown: hometown,
    changeAbout: about,
    changeOccupation: occupation,
    changeWebsite: website,
  });
  const [showUpdateMsg, setshowUpdateMsg] = useState(false);

  // Make sure all fields in updateInfo gets the value from props
  useEffect(() => {
    setUpdatedInfo({
      id: id,
      changeName: name,
      changeNick: nickname,
      changeMail: email,
      hometown: hometown,
      changeAbout: about,
      changeOccupation: occupation,
      changeWebsite: website,
    });
  }, [name, nickname, email, hometown, about, occupation, website]);

  useEffect(() => {
    if (showUpdateMsg) {
      const timer = setTimeout(() => {
        setshowUpdateMsg(false);
      }, 3000); // samma tid som i animation: 3s

      return () => clearTimeout(timer);
    }
  }, [showUpdateMsg]);

  function handleChange(e, id) {
    setUpdatedInfo((prevInfo) => ({ ...prevInfo, [id]: e.target.value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const data = await updateUserInfo(updatedInfo);
      if (data.ok) {
        setshowUpdateMsg(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const displayUpdateMsg = showUpdateMsg ? "user-updated" : "hide-updated-div";

  return (
    <form id="update-info" onSubmit={handleUpdate}>
      <label htmlFor="changeName">Name:</label>
      <input
        type="text"
        id="changeName"
        placeholder={name}
        value={updatedInfo.changeName}
        onChange={(e) => handleChange(e, "changeName")}
      />

      <label htmlFor="changeNick">Nickname:</label>
      <input
        type="text"
        id="changeNick"
        placeholder={nickname}
        value={updatedInfo.changeNick}
        onChange={(e) => handleChange(e, "changeNick")}
      />

      <label htmlFor="changeMail">Email:</label>
      <input
        type="text"
        id="changeMail"
        placeholder={email}
        value={updatedInfo.changeMail}
        onChange={(e) => handleChange(e, "changeMail")}
      />

      <label htmlFor="hometown">Hometown:</label>
      <input
        type="text"
        id="hometown"
        placeholder={hometown}
        value={updatedInfo.hometown}
        onChange={(e) => handleChange(e, "hometown")}
      />

      <label htmlFor="changeAbout">About:</label>
      <input
        type="text"
        id="changeAbout"
        placeholder={about}
        value={updatedInfo.changeAbout}
        onChange={(e) => handleChange(e, "changeAbout")}
      />

      <label htmlFor="changeOccupation">Occupation:</label>
      <input
        type="text"
        id="changeOccupation"
        placeholder={occupation}
        value={updatedInfo.changeOccupation}
        onChange={(e) => handleChange(e, "changeOccupation")}
      />

      <label htmlFor="changeWebsite">Website:</label>
      <input
        type="text"
        id="changeWebsite"
        placeholder={website}
        value={updatedInfo.changeWebsite}
        onChange={(e) => handleChange(e, "changeWebsite")}
      />

      <div className={displayUpdateMsg}>Info saved</div>

      {/* Change password? */}
      <input type="submit" id="save-button" value="Save" />
    </form>
  );
}

export default UpdateInfoForm;
