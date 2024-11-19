import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom"; // Correct import for routing
import StoreContextProvider from './context/StoreContext.jsx'; // Use the Provider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider> {/* Correctly using the provider */}
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
