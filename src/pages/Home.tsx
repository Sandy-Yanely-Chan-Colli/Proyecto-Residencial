import React from 'react';
import Card from '../components/Cards/Card';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import ReporteSpa from '../components/ReporteSpa/ReporteSpa';

// Importa las imágenes directamente
// Importa las imágenes directamente
import spaImage from '../assets/LogosIndex/spa.png';
import gymImage from '../assets/LogosIndex/gym.png';
import canchaImage from '../assets/LogosIndex/cancha.png';
import albercasImage from '../assets/LogosIndex/albercas.png';
import calleImage from '../assets/LogosIndex/calle.png';
import entradaImage from '../assets/LogosIndex/albercas.png';

interface CardItem {
  title: string;
  image: string;
  description: string;
  path: string;
}
const Home: React.FC = () => {
  const navigate = useNavigate();
  const cards: CardItem[] = [
    { title: 'Spa', image: spaImage, description: 'Title Description', path:'/reportespa' },
    { title: 'Gym', image: gymImage, description: 'Title Description', path:'/reportespa' },
    { title: 'Canchas', image: canchaImage, description: 'Title Description', path:'/reportespa' },
    { title: 'Albercas', image: albercasImage, description: 'Title Description', path:'/reportespa' },
    { title: 'Calle', image: calleImage, description: 'Title Description', path:'/reportespa' },
    { title: 'Entrada', image: entradaImage, description: 'Title Description', path:'/reportespa' }
  ];

  const handleCardClick = (path: string) => {S
    navigate(path);
  };
  return (
    <>
      <div className={styles.welcomeMessage}>
        <h2>¿En qué podemos ayudar?</h2>
        <p>No dude en crear su reporte</p>
      </div>
      
      <div className={styles.cardsContainer}>
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            image={card.image}
            description={card.description}
            path={card.path}
            onClick={() => console.log(`Clicked ${card.title}`)}
          />
        ))}
      </div>
    </>
  );
};

export default Home;