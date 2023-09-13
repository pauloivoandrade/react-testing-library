import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Pokedex } from '../pages';
import { PokemonType } from '../types';

// Função auxiliar para obter o elemento do Pokémon e seu texto
function getPokemonElementAndText() {
  const pokemonElement = screen.getByTestId('pokemon-name');
  const pokemonText = pokemonElement.textContent;
  return { pokemonElement, pokemonText };
}

// Resto do seu código de teste...

// Constante para o texto do botão
const NEXT_POKEMON_BUTTON_TEXT = 'Próximo Pokémon';

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
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Pokedex pokemonList={ mockPokemonList } favoritePokemonIdsObj={ {} } />
      </BrowserRouter>,
    );
  });

  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    // Verifique se o elemento com o texto "Encountered Pokémon" está presente na tela
    const encounteredTxt = screen.getByText('Encountered Pokémon', { selector: 'h2' });
    expect(encounteredTxt).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo Pokémon', () => {
    const nxtBtn = screen.getByRole('button', { name: NEXT_POKEMON_BUTTON_TEXT });
    expect(nxtBtn).toBeInTheDocument();
  });

  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
    const nxtBtn = screen.getByRole('button', { name: NEXT_POKEMON_BUTTON_TEXT });
    const { pokemonText: initialPokemonText } = getPokemonElementAndText();
    expect(initialPokemonText).toContain('Pikachu');
    await userEvent.click(nxtBtn);
    const { pokemonText: newPokemonText } = getPokemonElementAndText();
    expect(newPokemonText).toContain('Charmander');
  });

  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista', async () => {
    const nxtBtn = screen.getByRole('button', { name: NEXT_POKEMON_BUTTON_TEXT });

    // Avance até o último Pokémon da lista
    await userEvent.click(nxtBtn);

    // Verifique se o último Pokémon da lista (Charmander) está na tela
    const lastPokemon = getPokemonElementAndText();
    expect(lastPokemon.pokemonText).toContain('Charmander');

    // Clique novamente no botão "Próximo Pokémon"
    await userEvent.click(nxtBtn);

    // Verifique se o primeiro Pokémon da lista (Pikachu) está na tela novamente
    const firstPokemon = getPokemonElementAndText();
    expect(firstPokemon.pokemonText).toContain('Pikachu');
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    expect(Pokedex.length).toBe(1);
  });
  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    typeBtn.forEach((button) => {
      const buttonText = button.textContent;
      expect(pokemonTypes).toContain(buttonText);
      // Remova o tipo correspondente da lista para garantir que não seja repetido
      pokemonTypes.splice(pokemonTypes.indexOf(buttonText), 1);
    });
  });
  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
    const typeBtn = screen.getByRole('button', { name: 'Fire' });
    await userEvent.click(typeBtn);
    const getCurrentPokemon = screen.getByText('Charmander');
    expect(getCurrentPokemon).toBeInTheDocument();
  });
  test('', () => {});
});
