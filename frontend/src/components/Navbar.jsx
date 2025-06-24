import React from 'react';
import './Navbar.css';

const Navbar = ({ setMessage }) => {
  return (
    <nav className="navbar">
      <div
        className="navbar-title"
        onClick={() => setMessage('Tata Motors Project')}
        style={{ cursor: 'pointer' }}
      >
        My App
      </div>
      <div className="navbar-links">
        <span className="navbar-link" onClick={() => setMessage('This is the engine division webapp')}>
          Home
        </span>
        <span className="navbar-link" onClick={() => setMessage('The project is made in Tata motors')}>
          Project
        </span>
        <span className="navbar-link" onClick={() => setMessage('__COMMAND__')}>
          CommandArea
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
