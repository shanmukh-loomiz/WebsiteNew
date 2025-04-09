"use client";

import Link from "next/link";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* Left Side - Logo */}
        <Link className="navbar-brand" href="/">
          <img src="/LOOMIZ LOGO DARK BLUE 1.svg" alt="Loomiz Logo" className="logo" />
        </Link>

        {/* Middle - Nav Links */}
        <div className="nav-links">
          <Link className="nav-link" href="/about">About</Link>
          <Link className="nav-link" href="/contact">Contact</Link>
          <Link className="nav-link" href="/solutions">Solutions</Link>
          <Link className="nav-link" href="/blog">Blog</Link>
        </div>

        {/* Right Side - Log In Button */}
        {/* <Link  href="/login">LOG IN</Link> */}
        <button className="login-btn">SIGN UP</button>
      </div>
    </nav>
  );
};

export default Navbar;
