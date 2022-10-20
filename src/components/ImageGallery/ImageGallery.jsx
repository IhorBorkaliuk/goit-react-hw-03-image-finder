import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import findImages from 'components/FindImages/FindImages';


export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loader: false,
    query: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { query } = this.props;
    if (page > prevState.page) {
      this.loadImages(query, page);
      return;
    }
    if (prevProps.query !== query && page === prevState.page) {
      this.loadImages(query, 1);
      this.setState({ page: 1 });
      return;
    }
  }

  async loadImages(currentName, currentPage) {
    this.setState({ loading: true });
    try {
      const result = await findImages(currentName, currentPage);
      const items = result.hits;
      if (items.length === 0) {
        return Notiflix.Notify.failure('Зображень не знайдено');
      }
      if (currentPage === 1) {
        this.setState(() => {
          return {
            images: [...items],
          };
        });
      } else {
        this.setState(({ images }) => {
          return {
            images: [...images, ...items],
          };
        });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  reset = () => {
    this.setState({
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <ul>
          {images.map(el => {
            return <ImageGalleryItem item={el} key={el.id} />;
          })}
        </ul>
        {images.length >= 12 && <Button onClick={this.loadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number,
};