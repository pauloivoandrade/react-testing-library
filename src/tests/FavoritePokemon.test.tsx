import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';
import { FavoritePokemon } from '../pages';

describe('Teste o componente <FavoritePokemon.tsx />', () => {
  test('Exibe a mensagem "No favorite Pokémon found" quando não há Pokémon favoritados', () => {
    renderWithRouter(<App />, { route: '/favorites' });

    const notFoundFavorite = screen.getByText('No favorite Pokémon found');
    expect(notFoundFavorite).toBeInTheDocument();
  });

  test('Exibe apenas os Pokémon favoritados quando existem', () => {
    const pokemonList = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
    }];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    pokemonList.forEach((pokemon) => {
      const pokemonId = screen.getByText(pokemon.name);
      expect(pokemonId).toBeInTheDocument();
    });

    const notFoundFavorite = screen.queryByText('No favorite Pokémon found');
    expect(notFoundFavorite).not.toBeInTheDocument();
  });
});
