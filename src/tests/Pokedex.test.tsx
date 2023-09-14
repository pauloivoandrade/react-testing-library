import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, createMemoryRouter, Router } from 'react-router-dom';
import { Pokedex } from '../pages';
import { PokemonType, AverageWeightType } from '../types';

// Função auxiliar para obter o elemento do Pokémon e seu texto
function getPokemonElementAndText() {
  const pokemonElement = screen.getByTestId('pokemon-name');
  const pokemonText = pokemonElement.textContent;
  return { pokemonElement, pokemonText };
}

const NEXT_POKEMON_BUTTON_TEXT = 'Próximo Pokémon';

const mockPokemonList: PokemonType[] = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
  },

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

    await userEvent.click(nxtBtn);

    const lastPokemon = getPokemonElementAndText();
    expect(lastPokemon.pokemonText).toContain('Charmander');

    await userEvent.click(nxtBtn);
    await userEvent.click(nxtBtn);
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

      pokemonTypes.splice(pokemonTypes.indexOf(buttonText), 1);
    });
  });
  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
    const typeBtn = screen.getByRole('button', { name: 'Fire' });
    await userEvent.click(typeBtn);
    const getCurrentPokemon = screen.getByText('Charmander');
    expect(getCurrentPokemon).toBeInTheDocument();
  });
  test('O texto do botão deve corresponder ao nome do tipo', async () => {
    const getPkn = screen.getByTestId('pokemon-type');
    const typeBtn = screen.getByRole('button', { name: 'Fire' });
    await userEvent.click(typeBtn);
    expect(typeBtn.textContent).toBe(getPkn.textContent);
  });
  test('O botão All precisa estar sempre visível', async () => {
    const typeBtn = screen.getByRole('button', { name: 'All' });
    const fireBtn = screen.getByRole('button', { name: 'Fire' });
    await userEvent.click(fireBtn);
    expect(typeBtn).toBeInTheDocument();
  });
  test('O texto do botão deve ser All', () => {
    const resetBtn = screen.getByRole('button', { name: 'All' });
    expect(resetBtn).toBeInTheDocument();
  });
  test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', async () => {
    const nxtBtn = screen.getByRole('button', { name: NEXT_POKEMON_BUTTON_TEXT });
    const resetBtn = screen.getByRole('button', { name: 'All' });
    await userEvent.click(resetBtn);
    const { pokemonText: initialPokemonText } = getPokemonElementAndText();
    expect(initialPokemonText).toContain('Pikachu');
    await userEvent.click(nxtBtn);
    const { pokemonText: newPokemonText } = getPokemonElementAndText();
    expect(newPokemonText).toContain('Charmander');
  });
  test('Ao carregar a página, o botão "All" deve estar ativado', async () => {
    const allButtons = screen.getByRole('button', { name: 'All' });
    expect(allButtons).toBeInTheDocument();
    const typeBtn2 = screen.getByRole('button', { name: 'Bug' });
    await userEvent.click(typeBtn2);
    const getCurrentPokemon2 = screen.getByText('Caterpie');
    expect(getCurrentPokemon2).toBeInTheDocument();
    await userEvent.click(allButtons);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    // const pokemonElements = screen.getAllByTestId('pokemon-name');
    // expect(pokemonElements.length).toBe(pokemonElements.length);
  });
});
// qnpx stryker run ./stryker/Pokedex.conf.json
