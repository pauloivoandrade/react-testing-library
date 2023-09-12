import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, MemoryRouterProps } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { NotFound } from '../pages';
import { PokemonType } from '../types';

describe('Teste o componente <NotFound.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />, { wrapper: BrowserRouter });

    const notFoundTxt = screen.getByText('Page requested not found', { selector: 'h2' });
    expect(notFoundTxt).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem com o texto alternativo', () => {
    render(<NotFound />, { wrapper: BrowserRouter });

    const imgData = screen.getByRole('img');
    expect(imgData).toHaveAttribute('alt', "Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  });
});
