import React from 'react';
import "../App.css";
import Work from "./Work";
import Payment from "./Payment"
import Footer from "./Footer";
import Upper from "./Upper";
import About from "./About";
import Contact from "./Contact";

function Homepage() {
   
  return (
    <div>
    <div className="App">
      <Upper />
      <About />
      <Work />
      <Payment />
      <Contact />
      <Footer />
    </div>
    </div>
  );
}

export default Homepage;