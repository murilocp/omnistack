import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../assets/logo.svg.png';
import camera from '../assets/camera.svg';

// import { Container } from './styles';

export default function Header() {
  return (
    <header id="main-header">
        <div className="header-content">
          <Link to="/">
            <img id="img-logo" src={logo} width="100" height="50" alt="InstaRocket" />
          </Link>
          
          <Link to="/new">
            <img id="img-camera" src={camera} width="50" height="50" alt="Enviar publicação" />
          </Link>
          
        </div>
    </header>
  );
}
