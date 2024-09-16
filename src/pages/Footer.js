import React from 'react';
import Logo from '../Assets/logoEvents.png';
import { BsTwitter } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';
import { BsYoutube } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        gap: '1rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div>
          <img src={Logo} alt='Logo' style={{ width: '80px' }} />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          justifyContent: 'center',
          margin: '1rem'
        }}
      >
        <div>
          <h4>Quality</h4>
          <ul>
            <li>About us</li>
            <li>Our team</li>
            <li>Careers</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li>FAQs</li>
            <li>Support</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h4>Share</h4>
          <ul>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <span style={{ fontSize: '0.8rem' }}>Terms & Conditions</span>
        <span style={{ fontSize: '0.8rem' }}>Privacy Policy</span>
      </div>
    </div>
  );
};

export default Footer;
