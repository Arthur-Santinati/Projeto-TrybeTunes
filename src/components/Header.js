import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nome: '',
      load: false,
    };
    // setando o nome como vazio incialmente e o loading como false
  }

  componentDidMount() {
    getUser().then(({ name }) => {
      this.setState({
        nome: name,
        load: true,
      });
    });
    // usando o componentDidMount pois ele serve para fazer o que está dentro dele assim que o componente for montado, usando a função getUser para resgatar as informações do usuario que no caso eu seto o state para pegar o nome que o usuario colocou lá no input, e assim que eu entro no header o carregando é mudado para true e assim renderizado na tela
  }

  render() {
    const { nome, load } = this.state;
    return (
      <header data-testid="header-component">
        {/* se o load for falso (como setado no inicio) ele renderiza o componente, e quando load for true que no caso é quando o usuario entra na pagina então ele renderiza o carregando */}
        {/* criação dos links de navegação para o usuario */}
        {load ? (
          <div>
            <h4 data-testid="header-user-name">
              Usuário:
              { ' ' }

              {nome}
            </h4>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="link-dark"
            >
              Profile
            </Link>
            <br />
            <br />
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="link-dark"
            >
              Favorites
            </Link>
            <br />
            <br />
            <Link
              data-testid="link-to-search"
              to="/search"
              className="link-dark"
            >
              Search
            </Link>
            <br />
            <br />
          </div>) : <Loading />}
      </header>
    );
  }
}

export default Header;
