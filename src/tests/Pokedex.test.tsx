import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Pokedex } from '../pages';
import { PokemonType } from '../types';

// Resto do seu código de teste...

// Mock de dados para uso no teste
const mockPokemonList: PokemonType[] = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    // outras propriedades necessárias
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    // outras propriedades necessárias
  },
  // Adicione mais pokémons conforme necessário
];
describe('Teste o componente <Pokedex.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    // Renderize o componente Pokedex dentro de um BrowserRouter
    render(
      <BrowserRouter>
        <Pokedex pokemonList={ mockPokemonList } favoritePokemonIdsObj={ {} } />
      </BrowserRouter>,
    );

    // Verifique se o elemento com o texto "Encountered Pokémon" está presente na tela
    const encounteredTxt = screen.getByText('Encountered Pokémon', { selector: 'h2' });
    expect(encounteredTxt).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo Pokémon', () => {
    render(
      <BrowserRouter>
        <Pokedex pokemonList={ mockPokemonList } favoritePokemonIdsObj={ {} } />
      </BrowserRouter>,
    );
    const nxtBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(nxtBtn).toBeInTheDocument();
  });
  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
    render(
      <BrowserRouter>
        <Pokedex pokemonList={ mockPokemonList } favoritePokemonIdsObj={ {} } />
      </BrowserRouter>,
    );
    const nxtBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    const currentPokemon = screen.getByTestId('pokemon-name').textContent;
    expect(currentPokemon).toContain('Pikachu');
    await userEvent.click(nxtBtn);
    const newCurrentPokemon = screen.getByTestId('pokemon-name').textContent;
    expect(newCurrentPokemon).toContain('Charmander');
  });
  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista', async () => {
    render(
      <BrowserRouter>
        <Pokedex pokemonList={ mockPokemonList } favoritePokemonIdsObj={ {} } />
      </BrowserRouter>,
    );
    const nxtBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });

    // Avance até o último Pokémon da lista
    await userEvent.click(nxtBtn);

    // Verifique se o último Pokémon da lista (Charmander) está na tela
    const lastPokemon = screen.getByTestId('pokemon-name').textContent;
    expect(lastPokemon).toContain('Charmander');

    // Clique novamente no botão "Próximo Pokémon"
    await userEvent.click(nxtBtn);

    // Verifique se o primeiro Pokémon da lista (Pikachu) está na tela novamente
    const firstPokemon = screen.getByTestId('pokemon-name').textContent;
    expect(firstPokemon).toContain('Pikachu');
  });
});
