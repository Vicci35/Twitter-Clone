import React from "react";

function ProfilePic({ imageUrl, id }) {
  console.log("ProfilePic imageUrl:", imageUrl);
  const defaultImage =
    "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg";

  let src = defaultImage;

  if (imageUrl && imageUrl.trim() !== "") {
    // Byt backslash mot slash
    const fixedPath = imageUrl.replace(/\\/g, "/");
    src = `http://localhost:3000/${fixedPath}`;
  } 

  return <img id={id} src={src} alt="Profile" style={{ borderRadius: "50%" }} />;
}


export default ProfilePic;

//function ProfilePic({ imageUrl, id }) {
//  const defaultImage =
//    "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg";

  //const src = imageUrl && imageUrl.trim() !== ""
    //? `http://localhost:3000/${imageUrl}`
    //: defaultImage;

  //return <img id={id} src={src} alt="Profile" style={{ borderRadius: "50%" }} />;
//}