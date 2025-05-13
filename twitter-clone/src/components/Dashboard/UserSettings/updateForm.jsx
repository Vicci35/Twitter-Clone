import { useState } from "react";

function UpdateInfoForm({
  name,
  nickname,
  email,
  hometown,
  about,
  occupation,
  website,
}) {
  const [updatedInfo, setUpdatedInfo] = useState({
    memberSince: "",
    name: "",
    nickname: "",
    email: "",
    hometown: "",
    about: "",
    occupation: "",
    website: "",
  });

  return (
    <form id="update-info">
      <label htmlFor="changeName">Name:</label>
      <input type="text" id="changeName" placeholder={name} />

      <label htmlFor="changeNick">Nickname:</label>
      <input type="text" id="changeNick" placeholder={nickname} />

      <label htmlFor="changeMail">Email:</label>
      <input type="text" id="changeMail" placeholder={email} />

      <label htmlFor="hometown">Hometown:</label>
      <input type="text" id="hometown" placeholder={hometown} />

      <label htmlFor="changeAbout">About:</label>
      <input type="text" id="changeAbout" placeholder={about} />

      <label htmlFor="changeOccupation">Occupation:</label>
      <input type="text" id="changeOccupation" placeholder={occupation} />

      <label htmlFor="changeWebsite">Website:</label>
      <input type="text" id="changeWebsite" placeholder={website} />

      {/* Change password? */}
      <input type="submit" id="save-button" value="Save" />
    </form>
  );
}

export default UpdateInfoForm;
