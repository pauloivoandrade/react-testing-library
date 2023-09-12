import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from '../pages';

describe('Testes do componente <About.tsx />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const aboutInfo = screen.getByText('About Pokédex');
    expect(aboutInfo).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const h2Element = screen.getByText('About Pokédex', { selector: 'h2' });
    expect(h2Element).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const paragraphs = screen.getAllByText(/./, { selector: 'p' });
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const imgData = screen.getByRole('img');
    expect(imgData).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
