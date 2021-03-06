import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/FooterMenu';
import './styles.css';

async function Random() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
}

export const ExplorarBebidas = () => {
  const [id, setId] = useState('');

  useEffect(() => {
    Random().then((response) => {
      setId(response.drinks[0].idDrink);
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="explore-box">
        <Link to="/explorar/bebidas/ingredientes">
          <button data-testid="explore-by-ingredient">Por Ingredientes</button>
        </Link>
        <Link to={`/bebidas/${id}`}>
          <button data-testid="explore-surprise">Me Surpreenda!</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarBebidas;
