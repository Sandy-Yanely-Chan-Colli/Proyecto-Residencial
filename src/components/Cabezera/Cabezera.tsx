import React from 'react';
import styles from './Cabezera.module.css';
import logo from './logo.png';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`${styles.header} ${className || ''}`}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;