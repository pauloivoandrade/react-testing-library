import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PokemonDetails } from '../pages';

const mockPokemon = {
  id: 1,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: '/pikachu.png',
};

describe(' Teste o componente <PokemonDetails.tsx />', () => {
  test('Teste se o nome do Pokémon é mostrado na tela:', () => {
    render(
      <Router>
        <PokemonDetails pokemon={ mockPokemon } />
      </Router>,
    );
    const getPokemonName = screen.getByText(/mockPokemon.name/i);
    expect(getPokemonName).toBeInTheDocument();
  });
});
