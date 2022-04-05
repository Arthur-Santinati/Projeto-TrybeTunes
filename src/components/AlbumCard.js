import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { id, artist, image, collectionName } = this.props;
    return (
      <div>
        {/* Transformando o card do album em um link clicavel e renderizando de acordo com o que o usuario pesquisou, pegando a imagem, o nome do album e o nome do artista */}
        <Link
          data-testid={ `link-to-album-${id}` }
          to={ `/album/${id}` }
          className="link-dark"
        >
          <div>
            <br />
            <br />
            <img src={ image } alt={ collectionName } />
            <br />
            <br />
            <span>{ collectionName }</span>
            <br />
            <span>{ artist }</span>
          </div>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  id: PropTypes.string,
  artist: PropTypes.string,
  image: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;

export default AlbumCard;
