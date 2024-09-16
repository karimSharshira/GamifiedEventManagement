import React from "react";
import { useNavigate } from "react-router-dom";
import basic from "../Assets/1684330330510.png";
import standerd from "../Assets/1684330341599.png";
import premium from "../Assets/1684330345966.png";

const Payment = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Redirect to the payment page
    window.location.href = "http://localhost:3001/";
  };

  const workInfoData = [
    {
      image: basic,
      title: "Basic",
      text: "$5/Month",
      text2:
        "The Basic Plan offers essential features for managing your gamified events. It provides a solid foundation with necessary tools, such as event creation, participant management, and basic analytics. This plan is suitable for those who are starting out or have simpler event requirements.",
    },
    {
      image: standerd,
      title: "Standard",
      text: "$10/Month",
      text2:
        "The Standard Plan is designed for users who want more advanced features to enhance their gamified event management experience. In addition to the basic features, this plan includes additional functionalities like customizable branding options, advanced analytics and reporting, and integration with popular third-party platforms. It offers a balanced package for users who require more flexibility and control.",
    },
    {
      image: premium,
      title: "Premium",
      text: "$15/Month",
      text2:
        "The Premium Plan provides the ultimate level of features and benefits for your gamified event management needs. This top-tier plan includes all the features of the Basic and Standard plans, as well as exclusive offerings such as priority support, advanced customization options, personalized training sessions, and premium integrations. With the Premium Plan, you'll have access to the most comprehensive set of tools and resources to create unforgettable gamified events.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">3 Plans</p>
        <h1 className="primary-heading">Pricing</h1>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text2}</p>
            <h3>{data.text}</h3>
            <button onClick={handleButtonClick}>Go to Payment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
