import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonList = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

describe(' Teste o componente <PokemonDetails.tsx />', () => {
  test('Teste se o nome do Pokémon é mostrado na tela:', () => {
    renderWithRouter(<App />, { route: `/pokemon/${pokemonList.id}` });
    const getPokemonName = screen.getByText(`${pokemonList.name} Details`);
    expect(getPokemonName).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'More Details' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.'));
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />, { route: `/pokemon/${pokemonList.id}` });
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' })).toBeInTheDocument();

    const locationImages = screen.getAllByAltText(`${pokemonList.name} location`);
    expect(locationImages).toHaveLength(pokemonList.foundAt.length);
    pokemonList.foundAt.forEach((location, index) => {
      const locationName = screen.getByText(location.location);
      expect(locationName).toBeInTheDocument();
      const locationImage = locationImages[index];
      expect(locationImage).toBeInTheDocument();
      expect(locationImage).toHaveAttribute('src', location.map);
    });
  });
  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: `/pokemon/${pokemonList.id}` });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    const labelCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheck).toBeInTheDocument();
  });
});
