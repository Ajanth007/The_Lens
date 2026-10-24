import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import  AuthContextProvider  from "./context/AuthContext";
// import { PreloaderProvider } from './component/Preloader/PreloaderProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BrowserRouter>
     <AuthContextProvider>
      {/* <PreloaderProvider> */}
        <App />
      {/* </PreloaderProvider> */}
      </AuthContextProvider>
    </BrowserRouter>

  </StrictMode>
);