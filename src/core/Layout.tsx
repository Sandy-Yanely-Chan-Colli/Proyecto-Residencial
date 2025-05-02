import React, { ReactNode } from 'react';
import Header from '../components/Cabezera/Cabezera';
import Navbar from '../components/navbar/Navbar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Navbar />
      <main className={`${styles.mainContainer} ${className || ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;