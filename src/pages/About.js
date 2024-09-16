import React, { useState } from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutImage from "../Assets/about.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Create an event and manage all its aspects
        </h1>
        <p className="primary-text">
          An event management system essentially helps you keep track of every
          detail related to an event—both large and small—and can help you
          collaborate with vendors, partners, and team members to execute a
          successful event
        </p>
        <p className="primary-text">
          Depending on your needs, budget, and event size, you might find that
          one program works better than others. To cover your bases, here is our
          software for event planning that covers most of the main event plan:
        </p>
        <div className="about-buttons-container">
          <button className="watch-video-button" onClick={handleWatchVideo}>
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
      {showVideo && (
        <div className="video-modal" onClick={handleCloseVideo}>
          <div className="video-modal-content">
            <video
              src={require("../Assets/website.mp4")}
              controls
              autoPlay
              onEnded={() => setShowVideo(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
