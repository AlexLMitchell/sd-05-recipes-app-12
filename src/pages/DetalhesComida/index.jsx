import React, { useContext, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

// O aluno Felipe Vieira auxiliou na solução da tag iframe
const DetalhesComida = () => {
  const { dataDetail, setDataDetail } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    async function verify() {
      if (pathName === `/comidas/${id}`) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setDataDetail(data);
      }
      if (pathName === `/bebidas/${id}`) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setDataDetail(data);
      }
    }
    verify();
  }, [setDataDetail, id, pathName]);
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKey = Object.keys(dataDetail.meals[0]).filter((key) => key.includes('strIngredient') && dataDetail.meals[0][key] !== '');
  async function Recomendadas() {
    if (pathName.match(/comidas/)) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
        const data = await response.json();
        setDataDetail(data);
    } else if (pathName.match(/bebidas/)) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
       setDataDetail(data);
    }
  }
  return (
    <div>
      <img
        data-testid="recipe-photo" src={dataDetail.meals[0].strMealThumb}
        width="200px" height="150px" alt={dataDetail.meals[0].strMeal}
      />
      <h1 data-testid="recipe-title">{dataDetail.meals[0].strMeal}</h1>
      <span data-testid="recipe-category">{dataDetail.meals[0].strCategory}</span>
      <img src={shareIcon} data-testid="share-btn" alt="Share Icon" />
      <img src={whiteHeartIcon} data-testid="favorite-btn" alt="White Heart Icon" />
      <h1>Ingredients</h1>
      {filtersKey.map((filter, index) => (
        <p data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail.meals[0][filter]} - {dataDetail.meals[0][`strMeasure${index + 1}`]}</p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.meals[0].strInstructions}</p>
      <h1>Vídeos</h1>
      <iframe
        data-testid="video" width="200px" src={dataDetail.meals[0].strYoutube &&
        dataDetail.meals[0].strYoutube.replace('watch?v=', 'embed/')}
        frameBorder="0" allow="autoplay" allowFullScreen="true"
      />
      <h1>Recomendadas</h1>
      {filtersKey.map((filter, index) => (
        <img type="button" data-testid={`${index}-recomendation-card`} onClick={() => Recomendadas()} />
      ))}
      <Link to={`/comidas/${id}/progress`}>
        <input type="button" data-testid="start-recipe-btn" value="Iniciar Receitas" />
        {filtersKey.map((filter, index) => (
          <h6 data-testid={`${index}-recomendation-title`}></h6>
        ))}
      </Link>  
    </div>
  );
};
export default DetalhesComida;
