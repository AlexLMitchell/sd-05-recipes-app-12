import React, { useState, useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';

const SearchBar = () => {
  const [ingredient, setIngredient] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [search, setSearch] = useState('name');
  const [filteredText, setText] = useState('');
  const { setData } = useContext(RecipesContext);
  async function handleClick(searchs) {
    if (searchs === 'ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filteredText}`);
      const data = await response.json();
      setData(data);
      setIngredient(searchs);
    } else if (searchs === 'name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filteredText}`);
      const data = await response.json();
      setData(data);
      setName(searchs);
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filteredText}`);
      const data = await response.json();
      setData(data);
      setFirstLetter(searchs);
    }
  }
  return (
    <div>
      <input type="text" data-testid="search-input" onChange={(e) => setText(e.target.value)} />
      <label htmlFor="ingredient">Ingredient</label>
      <input
        type="radio" id="ingredient" value={ingredient} name="radioInput"
        data-testid="ingredient-search-radio" onClick={(e) => setSearch(e.target.id)}
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio" id="name" name="radioInput" value={name} data-testid="name-search-radio"
        onChange={(e) => setSearch(e.target.id)}
      />
      <label htmlFor="firstLetter">First Letter</label>
      <input
        type="radio" id="firstLetter" value={firstLetter} name="radioInput"
        data-testid="first-letter-search-radio" onChange={(e) => setSearch(e.target.id)}
      />
      <button type="button" onClick={() => handleClick(search)}>Buscar</button>
    </div>
  );
};

export default SearchBar;