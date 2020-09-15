import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipeCard from '../../components/RecipeCard/';

export function Comidas() {
  return (
    <div>
      <Header />
      <SearchBar />
      <RecipeCard />
    </div>
  );
}

export const DetalhesComida = () => (<div><h1>OLá Felipinho Lindu!!!! s2 muchas gracias </h1></div>);
export const DetalhesComidaProgress = () => <div>Oi</div>;
