import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { StyledGallery } from './ImageGalleryStyled';
import { Loader } from 'components/Loader/Loader';
import apiServices from 'components/services/apiServices.js';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    loading: false,
    showLoadMore: true,
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

  async loadImages(query, page) {
    this.setState({ loading: true });
    try {
      const result = await apiServices(query, page);
      const data = result.hits;
      const pagesCounter = Math.ceil(result.totalHits / 12);

      if (data.length === 0) {
        console.log(data.length);
        return Notiflix.Notify.failure('Зображень не знайдено');
      }
      if (page === 1) {
        this.setState(() => {
          return {
            images: [...data],
          };
        });
        if (page >= pagesCounter) {
          Notiflix.Notify.failure('Це останні результати за Вашим запитом');
          this.setState({ showLoadMore: false });
        }
      } else {
        this.setState(({ images }) => {
          return {
            images: [...images, ...data],
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
      loading: true,
    }));
  };

  render() {
    const { images, loading, showLoadMore } = this.state;
    console.log(images.length);
    console.log(showLoadMore);
    return (
      <>
        <StyledGallery>
          {images.map(el => {
            return <ImageGalleryItem item={el} key={el.id} />;
          })}
        </StyledGallery>
        {showLoadMore && images.length >= 12 && (
          <Button onClick={this.loadMore} />
        )}
        {loading && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number,
};
