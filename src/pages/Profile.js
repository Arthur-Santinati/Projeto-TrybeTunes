import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h2> Pagina de Profile </h2>
        <Header />
      </div>);
  }
}

export default Profile;
