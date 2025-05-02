import React from 'react';
import styles from './Navbar.module.css';
import userImage from './dogy.svg';

interface NavbarProps {
  // Puedes añadir props aquí si las necesitas
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <ul className={styles.navLinks}>
          <li><a href="/reportes">Reportes</a></li>
          <li><a href="/notificaciones">Notificaciones</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
        
        <div className={styles.userProfile}>
          <img src={userImage} alt="Perfil de usuario" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;