import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <App.tsx />', () => {
  test('Teste se o topo da aplicação contém link deve ter o texto Home', () => {
    render(<App />, { wrapper: BrowserRouter });

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });
  test('Teste se o topo da aplicação contém link deve ter o texto About', () => {
    render(<App />, { wrapper: BrowserRouter });

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });
  test('Teste se o topo da aplicação contém link deve ter o texto Favorite Pokémon', () => {
    render(<App />, { wrapper: BrowserRouter });

    const favoritePokémonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoritePokémonLink).toBeInTheDocument();
  });
  it('Navega para a pagina inicial ao clicar no link Home', async () => {
    render(<App />, { wrapper: BrowserRouter });
    const homeLink = screen.getByRole('link', { name: 'Home' });
    await userEvent.click(homeLink);
    expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
  });
});
