import { Link } from 'react-router-dom';

import PageRoutes from './routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header-container">
        <header>
          <h1>Pokédex</h1>
          <nav>
            <Link className="link" data-testid="home-link" to="/">
              {`Home`}
            </Link>
            <Link className="link" data-testid="about-link" to="/about">
              {`About`}
            </Link>
            <Link className="link" data-testid="favorites-link" to="/favorites">
              {`Favorite Pokémon`}
            </Link>
          </nav>
        </header>
      </div>
      <div className="main-container">
        <main>
          <PageRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
