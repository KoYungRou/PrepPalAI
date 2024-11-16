// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <div style={titleStyle}>
        <h1>Meal Prep Helper</h1>
      </div>
      <nav>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/saved-recipes" style={linkStyle}>Saved Recipes</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/recommendations" style={linkStyle}>Recommendations</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// Inline styles (you can replace these with a CSS file or CSS-in-JS)
const headerStyle = {
  backgroundColor: '#4CAF50', // Green background
  padding: '10px 20px',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const titleStyle = {
  fontSize: '1.8rem',
};

const navListStyle = {
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: 0,
};

const navItemStyle = {
  margin: '0 15px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem',
  transition: 'color 0.3s',
};

linkStyle[':hover'] = {
  color: '#ddd', // Lighten the link color on hover
};

export default Header;
