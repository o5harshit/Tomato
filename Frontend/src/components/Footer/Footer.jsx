import React from 'react'
import "./Footer.css";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aliquid magnam molestias consectetur aperiam ducimus harum pariatur corporis consequuntur architecto. Natus unde quam repellat, inventore qui enim atque delectus deserunt.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="fackbook-icon" /><img src={assets.twitter_icon} alt="twitter-icon" /><img src={assets.linkedin_icon} alt="linkedin-icon" />
                </div>
            </div>
             <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
             </div>
             <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@gmail.com</li>
                </ul>
             </div>
        </div>
        <hr />
        <p className='footer-copyright'> Copyright 2024 © Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer