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

  async loadImages(query, page) {
    this.setState({ loading: true });
    try {
      const result = await findImages(query, page);
      const data = result.hits;
      if (data.length === 0) {
        return Notiflix.Notify.failure('Зображень не знайдено');
      }
      if (page === 1) {
        this.setState(() => {
          return {
            images: [...data],
          };
        });
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