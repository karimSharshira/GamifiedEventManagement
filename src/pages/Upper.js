import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import HomeIcon from "../Assets/kindpng.png";
const Upper = () => {
  return (
    <div className="home-container">
      
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Discover events where you'll love to Attend.
          </h1>
          <p className="primary-text">
          A truly comprehensive event management system will allow users and 
          organizers to access and manage all aspects of an event.
          </p>
        </div>
        <div style={{flex: 1, maxWidth: "600px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px"}}>
   <img src={HomeIcon} alt="" style={{width: "80%", height: "80%"}} />
</div>
      </div>
    </div>
  );
};

export default Upper;
