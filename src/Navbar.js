import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <Link
        class="navbar-brand"
        to="/">
        FW
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarToggler">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <Link
              class="nav-link"
              to="/">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link"
              to="/about">
              About
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link"
              to="/login">
              Log In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
