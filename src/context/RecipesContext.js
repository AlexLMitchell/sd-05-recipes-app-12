import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext();

export const Provider = ({ children }) => {
  const [ingredient, setIngredient] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [toggle, setToggle] = useState(true);
  const context = {
    ingredient,
    setIngredient,
    name,
    setName,
    firstLetter,
    setFirstLetter,
    categories,
    setCategories,
    data,
    setData,
    dataDetail,
    setDataDetail,
    toggle,
    setToggle,
  };

  return (
    <RecipesContext.Provider value={context}>
      {children}
    </RecipesContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
