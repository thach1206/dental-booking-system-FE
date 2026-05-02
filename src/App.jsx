import './App.css';

import { AuthProvider } from './contexts/authenticationContext';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
