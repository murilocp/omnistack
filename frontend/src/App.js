import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header'
import Routes from './routes';
//o ./ significa que é global
import './global.css';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />    
    </BrowserRouter>
  );
}

export default App;
