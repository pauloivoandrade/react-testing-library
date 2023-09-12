import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, MemoryRouterProps } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { PokemonDetails, FavoritePokemon } from '../pages';
import { PokemonType } from '../types';

const examplePokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  // Adicione outras propriedades necessárias aqui
};

describe('Teste o componente <FavoritePokemon.tsx />', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    render(<FavoritePokemon />, { wrapper: BrowserRouter });

    const noFavoriteMsg = screen.getByText('No favorite Pokémon found');
    expect(noFavoriteMsg).toBeInTheDocument();
  });

  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    const routeProps: MemoryRouterProps = {
      initialEntries: [`/pokemon/${examplePokemon.id}`],
    };

    // Renderize o componente PokemonDetails dentro de uma rota com o MemoryRouter
    render(
      <MemoryRouter { ...routeProps }>
        <PokemonDetails
          favoritePokemonIdsObj={ { [examplePokemon.id]: true } }
          onUpdateFavoritePokemon={ () => {} }
          pokemonList={ [examplePokemon] }
        />
      </MemoryRouter>,
    );

    // Agora renderize o componente FavoritePokemon com a lista de Pokémon favoritos
    const favoritesRouteProps: MemoryRouterProps = {
      initialEntries: ['/favorites'],
    };

    // Renderize o componente FavoritePokemon com a lista de Pokémon favoritos
    render(
      <MemoryRouter { ...favoritesRouteProps }>
        <FavoritePokemon
          pokemonList={ [examplePokemon] } // Use o mock de dados aqui
          favoritePokemonIdsObj={ { [examplePokemon.id]: true } }
        />
      </MemoryRouter>,
    );

    // Verifique se o nome do Pokémon é exibido
    const favPok = screen.getByText('Pikachu');
    expect(favPok).toBeInTheDocument();
  });
});
