import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import Perfil from '../pages/Profile';

afterEach(cleanup);
describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de perfil', () => {
  test('Tem Todos os data-testid do email e de todos os botões', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);

    expect(getByTestId('profile-email')).toBeInTheDocument();
    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
    expect(getByTestId('profile-email')).toBeDefined();
    expect(getByTestId('profile-done-btn')).toBeDefined();
    expect(getByTestId('profile-favorite-btn')).toBeDefined();
    expect(getByTestId('profile-logout-btn')).toBeDefined();
    expect(history.location.pathname).toBe('/perfil');
  });
});

describe('O e-mail da pessoa usuária deve estar visível', () => {
  test('O e-mail armazenado em localStorage está visívelpassed', () => {
    const { getByTestId } = renderWithRouter(<Perfil />);
    
    expect(getByTestId('profile-email').textContent).toEqual(
      JSON.parse(localStorage.__STORE__['user']).emailJSON.parse(localStorage.__STORE__['user'])
    );
  });
});
