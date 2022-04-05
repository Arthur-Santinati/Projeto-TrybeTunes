import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Bem vindo á sua página de musicas favoritas
      </div>
    );
  }
}

export default Favorites;
