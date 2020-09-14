import React, { useContext } from 'react';
// import index from './index';
import { RecipesContext } from '../../context/RecipesContext';


const RecipeCard = () => {
  const { data } = useContext(RecipesContext);
  console.log(data);

  if (data.meals !== undefined) {
    const test = data.meals.slice(0, 12);
    return (
      <div>
        {
          test.map((meal, index) =>
            <div key={meal.idMeal}>
              <img data-testid={`${index}-card-img`} src={meal.strMealThumb} alt={meal.strMeal} width="200px" />
              <div data-testid={`${index}-card-name`}>{meal.strMeal}</div>
            </div>,
          )
        }
      </div>
    );
  }

  return (
    <div>
      <h1>ainda não fez nenhuma busca</h1>
    </div>
  );
};

export default RecipeCard;
