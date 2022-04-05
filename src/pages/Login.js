import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    // state default para cada um dos paramentros
    this.state = {
      loginField: '', // input vazio
      btnClick: true, // setado como true pro botao ficar desabilitado
      loading: false, // carregando como falso para fazer a lógica invertida lá em baixo
      redirect: false, // redirect como false para assim que clicar no botao ir para a pagina search lá em baixo
    };
  }

  handleChange = ({ target: { id, value } }) => {
    let { btnClick } = this.state;
    const min = 3;
    btnClick = value.length < min; // botao só vai ser habilitado assim que tiver mais que 3 letras
    this.setState({
      [id]: value,
      btnClick,
    });
    // pegando o id e o value para assim que clicar (target)pegar o id da musica
  }

  handleClick = () => {
    // usando o handleClick para simular uma api que cria um usuario e muda as suas informações quando necessario
    const { loginField } = this.state;
    this.setState({ loading: true }); // fazendo o carregando aparecer assim que clicar no botao
    createUser({ name: loginField }).then((ret) => (
      // pegando o login para assim que o usuario digitar o nome dele ele renderizar e assim o nome mudar
      this.setState({
        redirect: ret,
      })
      // seto o estado do redirect para que lá em baixo depois que o botao for clicado a página mudar de rota
    ));
  }

  render() {
    const { loginField, btnClick, loading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="input-group mb-3">
        {!loading ? (
          <form className="form-login">
            <p> Digite seu nome: </p>
            <input
              type="text"
              id="loginField"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ loginField }
              placeholder="Arthur"
              className="form-control"
            />
            <br />
            <br />
            <button
              data-testid="login-submit-button"
              id="btnLogin"
              type="submit"
              onClick={ this.handleClick }
              disabled={ btnClick }
              className="btn btn-outline-primary"
            >
              Entrar
            </button>
            <br />
            <br />
          </form>) : <Loading />}
        {/* usando o ternário para renderizar o carregando depois que o botao de entrar for clicado */}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
