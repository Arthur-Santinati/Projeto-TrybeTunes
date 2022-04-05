import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbunsCards from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      btnClick: true,
      load: false,
      listOfAlbums: [],
      lastResult: '',
    };
    // setando todos os estados default normalmente
  }

  handleChange = ({ target: { id, value } }) => {
    let { btnClick } = this.state;
    const MIN_NUMBER = 2;
    btnClick = value.length < MIN_NUMBER; // habilitando o botao apenas depois de digitar o numero minimo
    this.setState({
      [id]: value,
      btnClick,
    });
    // desestruturei o target para ele pegar o [id] de acordo com o value que seria a string da musica que eu quero
  }

  handleClick = async (e) => {
    e.preventDefault(); // usando o preventDefault para ver se o evento é cancelavel ou não (li na documentação)
    const { search } = this.state;
    this.setState({ load: true });
    // pegando o search como state para usar ele quando a musica for pesquisada la no input como value e passando o load como true para renderizar um carregando assim que clicar em pesquisar
    searchAlbumsAPI(search).then((resp) => {
      this.setState({
        lastResult: search,
        search: '',
        listOfAlbums: [...resp],
        load: false,
      });
      // setanto o state do lastResult com o valor que a pessoa colocar no input que no caso é o search, limpando o input, e espalhando os albums achados por essa api, que no caso retorna uma promise, e tirando o carregando da tela com o load false
    });
  }

  render() {
    const { search, btnClick, load, listOfAlbums, lastResult } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {/* renderizados o header com os links e fazendo a lógica de sempre, carregando antes e renderizando depois o que eu quero  */}
        {!load ? (
          <form>
            <input
              type="text"
              id="search"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              value={ search }
              className="form-control"
            />
            <br />
            <br />
            <button
              data-testid="search-artist-button"
              id="btnSearch"
              type="submit"
              onClick={ this.handleClick }
              disabled={ btnClick }
              className="btn btn-outline-primary"
            >
              Pesquisar
            </button>
            <br />
            <br />
          </form>) : <Loading />}
        {(listOfAlbums.length > 0) ? (
          // aqui to verificando se a lista de albuns for maior que 0 no caso se o album existir eu renderizo ele na tela, senão eu renderizo uma mensagem de que nada foi encontrado
          <div>
            <span>
              { `Resultado de álbuns de: ${lastResult}` }
              {/* passando o last result como state para renderizar essa mensagem com o album que a pessoa procurou */}
            </span>
            { listOfAlbums.map((music) => (
              <AlbunsCards
                key={ music.collectionId }
                id={ music.collectionId }
                collectionName={ music.collectionName }
                artist={ music.artistName }
                image={ music.artworkUrl100 }
                // fazendo um map com o array de albuns encontrado de acordo com o albumCard e as props que eu passei, e passando as chaves da api para renderizar tudo certo
              />
            ))}
          </div>)
          : (
            <p>Nenhum álbum foi encontrado</p>)}
      </div>
    );
  }
}

export default Search;
