'use client';

import { useState } from 'react';
import '../styles/SignupSignin.css';

// import GoogleIcon from '../assets/google.svg'; // Use this if you're importing the SVG as a component

export default function AuthSwitcher() {
  const [activeForm, setActiveForm] = useState('signin'); // 'signin' or 'signup'

  return (
    <div className="auth-wrapper">
      {/* Left Panel */}
      <div className={`auth-panel left-panel ${activeForm === 'signup' ? 'active' : ''}`}>
        {activeForm === 'signup' ? (
          <div className="form-box">
            <h2>Create Account</h2>
            <input type="text" placeholder="Company Name" />
            <div className="input-row">
              <input type="text" placeholder="Contact Person" />
              <input type="text" placeholder="Phone No." />
            </div>
            <input type="email" placeholder="Email" />
            <div className="input-row">
              <input type="text" placeholder="Industry Type" />
              <input type="text" placeholder="GST/Tax Id" />
            </div>
            <input type="password" placeholder="Password" />
            <button className="action-btn">Register</button>

            <div className="or-divider-line"><span>Or</span></div>

            <button className="google-btn">
              <img src="/google.svg" alt="Google Icon" />
              Sign up with Google
            </button>
          </div>
        ) : (
          <div className="welcome-box">
            <h2>Hello!</h2>
            <p>Enter your details and start journey with us</p>
            <button onClick={() => setActiveForm('signup')}>Sign Up</button>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className={`auth-panel right-panel ${activeForm === 'signin' ? 'active' : ''}`}>
        {activeForm === 'signin' ? (
          <div className="form-box">
            <h2>Sign In</h2>

            <button className="google-btn">
              <img src="/google.svg" alt="Google Icon" />
              Sign in with Google
            </button>

            <div className="or-divider-line"><span>Or</span></div>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <div className="options">
              <label className="remember-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">forgot your password?</a>
            </div>

            <button className="action-btn">Sign In</button>
          </div>
        ) : (
          <div className="welcome-box">
            <h2>Welcome Back</h2>
            <p>To be connected with us please login with your personal info</p>
            <button onClick={() => setActiveForm('signin')}>Sign In</button>
          </div>
        )}
      </div>
    </div>
  );
}
