import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import { Pokemon } from '../components';
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
        <PokemonDetails pokemon={ pokemonList[0] } pokemonList={ pokemonList } />
      </Router>,
    );

    const getPokemonName = screen.getByText((content, element) => {
      // Verifica se o texto contém "Pikachu" em algum lugar, ignorando a capitalização
      return content.includes('Pikachu');
    });

    expect(getPokemonName).toBeInTheDocument();
  });
});
