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

describe('<Pokemon />', () => {
  it('deve exibir o nome correto do Pokémon', () => {
    render(
      <Router>
        <Pokemon pokemon={ mockPokemon } showDetailsLink={ false } isFavorite={ false } />
      </Router>,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('deve exibir o tipo correto do Pokémon', () => {
    render(
      <Router>
        <Pokemon pokemon={ mockPokemon } showDetailsLink={ false } isFavorite={ false } />
      </Router>,
    );

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });

  it('deve exibir o peso médio do Pokémon no formato correto', () => {
    render(
      <Router>
        <Pokemon pokemon={ mockPokemon } showDetailsLink={ false } isFavorite={ false } />
      </Router>,
    );

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('deve exibir a imagem do Pokémon com atributos src e alt corretos', () => {
    render(
      <Router>
        <Pokemon pokemon={ mockPokemon } showDetailsLink={ false } isFavorite={ false } />
      </Router>,
    );

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', '/pikachu.png');
  });

  it('deve exibir um link de detalhes do Pokémon com a URL correta', () => {
    render(
      <Router>
        <Pokemon pokemon={ mockPokemon } showDetailsLink isFavorite={ false } />
      </Router>,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toHaveAttribute('href', '/pokemon/1');
  });

  it('deve redirecionar para a página de detalhes ao clicar no link', async () => {
    const pokemonList = [mockPokemon];

    render(
      <Router>
        <Pokemon pokemon={ mockPokemon } showDetailsLink isFavorite={ false } />
      </Router>,
    );
    const detailBtn = screen.getByText('More details');
    await userEvent.click(detailBtn);

    render(<PokemonDetails pokemonList={ pokemonList } />);

    const getFavBtn = screen.getByText((content, element) => {
      // Verifique se o texto contém "Pokémon favoritado?"
      // Aqui, você pode usar content.toLocaleLowerCase() para ignorar a capitalização
      return content.includes('Pokémon favoritado?');
    });

    expect(getFavBtn).toBeInTheDocument();
  });

  it('deve exibir um ícone de estrela favorito com atributos src e alt corretos', () => {
    render(
      <Router>
        <Pokemon pokemon={ mockPokemon } showDetailsLink={ false } isFavorite />
      </Router>,
    );

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.png');
  });
});
