import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  image: string;
  description: string;
  path: string;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  image, 
  description, 
  onClick, 
  className 
}) => {
  return (
    <div 
      className={`${styles.card} ${className || ''}`} 
      onClick={onClick}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardContent}>
        <div className={styles.cardImage}>
          <img src={image} alt={title} />
        </div>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
};

export default Card;