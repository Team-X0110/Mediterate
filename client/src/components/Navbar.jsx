import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Mediterate</div>

      <ul style={styles.links}>
        <li>
          <Link
            to="/"
            style={{
              ...styles.link,
              ...(location.pathname === '/' ? styles.activeLink : {})
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            style={{
              ...styles.link,
              ...(location.pathname === '/about' ? styles.activeLink : {})
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/levels"
            style={{
              ...styles.link,
              ...(location.pathname === '/levels' ? styles.activeLink : {})
            }}
          >
            Levels
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            style={{
              ...styles.link,
              ...(location.pathname === '/login' ? styles.activeLink : {})
            }}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '90%',
    padding: '10px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent',
    position: 'absolute',
    top: 0,
    zIndex: 20,
    color: 'white',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
  activeLink: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  }
};

export default Navbar;