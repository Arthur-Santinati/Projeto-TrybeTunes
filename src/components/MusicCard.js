import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isCheck: false,
      load: false,
    };
    // setando o check como false para assim que o usuario clicar no input a musica ser favoritada e o load inicialmente como falso
  }

  componentDidMount() {
    const { trackId } = this.props;
    getFavoriteSongs(trackId).then((resp) => {
      // a função getFavoriteSongs retorna um array com as musicas favoritas selecionadas ou um vazio caso não tiver nenhuma, ela faz a requisição de acordo com o id e eu pego a resposta dessa api e uso o some para caso o retorno for true ele retornar a musica que eu favoritei
      const retorno = resp.some((fav) => fav.trackId === trackId);
      // pego o id da musica e faço uma verificação assim que o componente é montado
      this.setState({
        isCheck: retorno,
        load: false,
      });
    });
  }

  carrega = () => {
    this.setState({
      load: true,
    });
    // setando o loading como true para usar ele ali em baixo onde vou precisar
  }

  finaliza = () => {
    this.setState({
      load: false,
    });
    // setando o loading como false para usar ele quando não quiser mais que o carregando apareça
  }

  favoriteClick = ({ target: { checked } }, carrega, finaliza, o) => {
    carrega(); // fazendo o carregar aparecer
    if (checked) {
      addSong(o).then(() => {
        this.setState({
          isCheck: true,
        }, finaliza);
      });
      // fazendo um if para caso o input estiver checkado eu usar a função addSong para adicionar aos favoritos, e assim setando o estado do check como true
    } else {
      removeSong(o).then(() => {
        this.setState({
          isCheck: false,
        }, finaliza);
      });
      // aqui basicamente a mesma coisa, simulando a requisição de uma musica que voce quer adicionar e assim que acontece, uso o finaliza tb para tirar o carregando assim que for concluido, e assim tb setando o check como false caso eu clique no input para remover a musica
    }
  }

  render() {
    const { isCheck, load } = this.state;
    const { nameMusic, previewUrl, trackId, forSave } = this.props;
    return (
      <div data-testid="musicacard-page">
        {/* passando as props para renderizar a musica pesquisada de acordo com o que a função resgatou */}
        {!load ? (
          // transformando o load em true para que quando ele for false renderizar o loading
          <div btn-group>
            <h4>{nameMusic}</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ trackId } className="btn btn-outline-primary">
              Favorita
              <input
                name={ trackId }
                id={ trackId }
                className="btn-check btncheck1"
                type="checkbox"
                data-testid={ ` checkbox-music-${trackId}` }
                onChange={ (e) => {
                  this.favoriteClick(e, this.carrega, this.finaliza, forSave);
                } }
                // passando a função e usando o target que eu desconstrui la em cima para renderizar o nome da musica certinho, e depois dela renderizar o carregando, e depois finalizar
                checked={ isCheck }
              />
            </label>
          </div>
        ) : <Loading />}

      </div>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string,
  nameMusic: propTypes.string,
  trackId: propTypes.string,
  forSave: propTypes.object,
}.isRequired;

export default MusicCard;
