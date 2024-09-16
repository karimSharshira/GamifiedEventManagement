import React from "react";
import cycling from "../Assets/cycling.gif";
import running from "../Assets/running_1.gif";
import motocycle from "../Assets/motocycling_1.gif";
import business from "../Assets/business.png";
const Work = () => {
  const workInfoData = [
    {
      image: cycling,
      title: "Cycling Events",
      text: "Pedal your way to adventure at our thrilling cycling event!",
    },
    {
      image: running,
      title: "Running Events",
      text: "Get ready to lace up your shoes and conquer new distances at our exhilarating running events!",
    },
    {
      image: motocycle,
      title: "Motocycle Events",
      text: "Experience the adrenaline-fueled excitement of our thrilling motorcycle events!",
    },
    {
      image: business,
      title: "Business Events",
      text: "Elevate your business game and network with industry leaders at our premier business events!",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;