import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicaCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      collectionName: '',
    };
    // construindo o state default
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMuisicFromAp(id);
    // usando essa função para fazer a requisição do album de acordo com o id do album assim que o componente for montado, e desestruturando o match que seria um dos parametros proprios do react
  }

  getMuisicFromAp = async (id) => {
    const data = await getMusics(id);
    const { artistName, collectionName } = data[0];
    // aqui eu pego o primeiro item do array renderizado e resgato o nome do artista e do album
    const songs = await data.filter((music) => music.kind === 'song');
    // filtrando as musicas de acordo com uma chave dentro do array de musicas e assim fazendo ela ser uma função assincrona, usando tb a getMusics que faz a requisição e espera um id em string
    this.setState({
      artistName,
      collectionName,
      musics: songs,
    });
    // e assim que a requisição funciona eu seto o state para poder renderizar ele depois
  }

  render() {
    const { artistName, musics, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {/* renderizo o header que aparece os links */}
        <div>
          <h1 data-testid="album-name">
            {collectionName}
          </h1>
          <h4 data-testid="artist-name">{artistName}</h4>
          {musics.length > 0 && musics.map((key) => (
            <MusicaCard
              key={ key.trackId }
              previewUrl={ key.previewUrl }
              nameMusic={ key.trackName }
              trackId={ key.trackId }
              forSave={ key }
            />
            // aqui renderizo o componente card com suas props e uso um map para mapear cada um de acordo com as props e as devidas chaves que eu passei
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.number),
  }),
}.isRequired;

export default Album;
