import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';
import { isDisabled, hasLocalStorage, handleChange, isChecked, isNotChecked, verify } from '../../utils/utilities';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function renderProgress({ dataDetail, histories, id, checked, setChecked, filtersKeyOutra }) {
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const DetalhesBebidaProgress = () => {
  const { dataDetail, setDataDetail } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    async function verify() {
      if (pathName === `/comidas/${id}`) {
        const responses = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const datas = await responses.json();
        setDataDetail(datas.meals[0]);
      } else if (pathName === `/bebidas/${id}`) {
        const responses = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const datas = await responses.json();
        setDataDetail(datas.drinks[0]);
      }
    }
    verify();
  }, [setDataDetail, id, pathName]);

  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKeyOutra = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  return (
    <div>
      <img
        data-testid="recipe-photo" src={dataDetail.strDrinkThumb}
        width="200px" height="150px" alt={dataDetail.strDrink}
      />
      <h1 data-testid="recipe-title">{dataDetail.strDrink}</h1>
      <span data-testid="recipe-category">{dataDetail.strCategory}</span>
      <img src={shareIcon} data-testid="share-btn" alt="Share Icon" />
      <img src={whiteHeartIcon} data-testid="favorite-btn" alt="White Heart Icon" />
      <h1>Ingredients</h1>
      {filtersKeyOutra.map((filter, index) => (
        <div key={`drink${index + 1}`}>
          <label htmlFor={`drink${index + 1}`} className={`drink${index + 1}`} >
            <input
              type="checkbox" checked={hasLocalStorage(`drink${index + 1}`, id, histories)}
              id={`drink${index + 1}`}
              onChange={(e) =>
                handleChange(e, id, checked, setChecked, histories, isChecked, isNotChecked)
              }
              data-testid={`${index}-ingredient-step`}
            />
            {dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}
          </label>
        </div>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn" disabled={isDisabled()} type="button"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

const DetalhesBebidaProgress = () => {
  const { dataDetail, setDataDetail } = useContext(RecipesContext);
  const [checked, setChecked] = useState([]);
  const history = useHistory();
  const histories = history;
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    verify(pathName, id, setDataDetail);
  }, [setDataDetail, id, pathName]);

  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKeyOutra = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const params = { dataDetail, histories, id, checked, setChecked, filtersKeyOutra };
  return (
    renderProgress(params)
  );
};
export default DetalhesBebidaProgress;

renderProgress.propTypes = {
  filtersKeyOutra: PropTypes.arrayOf(PropTypes.object).isRequired,
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  histories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
};
        <p>
          <input type="checkbox" value="on" data-testid={`${index}-ingredient-step`} />
          {dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}
        </p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p>
      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </div>
  );
};
export default DetalhesBebidaProgress;
