export async function verify(pathName, id, setDataDetail) {
  if (pathName === `/comidas/${id}`) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setDataDetail(data.meals[0]);
  } else if (pathName === `/bebidas/${id}`) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setDataDetail(data.drinks[0]);
  }
}

export async function recommended(pathName, setMeal, setDrink) {
  if (pathName.match(/comidas/)) {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMeal(data.drinks);
  }
  if (pathName.match(/bebidas/)) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrink(data.meals);
  }
}

export function hasLocalStorage(str, id, history) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storage && history.location.pathname.includes('comidas')) {
    if (storage.meals[id]) {
      const check = storage.meals[id].some((item) => item === str);
      return check;
    }
  }
  if (storage && history.location.pathname.includes('bebidas')) {
    const check = storage.cocktails[id].some((item) => item === str);
    return check;
  }
  return false;
}

export function isDisabled() {
  let disabled = true;
  let checked = 0;
  const allInputs = document.querySelectorAll('input');
  allInputs.forEach((input) => (input.checked ? (checked += 1) : 0));
  if (checked > 0 && checked === allInputs.length) {
    disabled = false;
  }
  return disabled;
}

export function isChecked(e, id, checked, setChecked, history) {
  const checkInput = document.getElementsByClassName(`${e.target.id}`)[0];
  checkInput.style.textDecoration = 'line-through';
  setChecked([...checked, e.target.id]);
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (history.location.pathname.includes('comidas')) {
    storage.meals[id] = [...checked, e.target.id];
  } else if (history.location.pathname.includes('bebidas')) {
    storage.cocktails[id] = [...checked, e.target.id];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
}

export function isNotChecked(e, id, checked, setChecked, history) {
  const checkInput1 = document.getElementsByClassName(`${e.target.id}`)[0];
  checkInput1.style.textDecoration = 'none';
  const newArrayOfChecked = checked.filter((check) => check !== e.target.id);
  setChecked(newArrayOfChecked);
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (history.location.pathname.includes('comidas')) {
    storage.meals[id] = newArrayOfChecked;
  } else if (history.location.pathname.includes('bebidas')) {
    storage.cocktails[id] = newArrayOfChecked;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
}

const savedList = {
  cocktails: {},
  meals: {},
};

export function saveToLocalStorage(id, histories) {
  const oldList = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (histories.location.pathname.includes('comidas')) {
    if (oldList) {
      savedList.meals = { ...oldList.meals, [id]: [] };
      localStorage.setItem('inProgressRecipes', JSON.stringify(savedList));
    }
    savedList.meals[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedList));
  }
  if (histories.location.pathname.includes('bebidas')) {
    if (oldList) {
      oldList.cocktails = { ...savedList.cocktails, [id]: [] };
      localStorage.setItem('inProgressRecipes', JSON.stringify(oldList));
    }
    savedList.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedList));
  }
}

export function handleChange(e, id, checked, setChecked, history) {
  if (e.target.checked) {
    isChecked(e, id, checked, setChecked, history);
  } else {
    isNotChecked(e, id, checked, setChecked, history);
  }
}
