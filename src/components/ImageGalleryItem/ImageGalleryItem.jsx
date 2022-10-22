import { Component } from "react";
import { Modal } from "components/Modal/Modal";
import { Item, IMG } from "./ImageGalleryItemStyled";

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isModalOpen) {
      window.addEventListener('keydown', this.onModalKeydown);
    } else window.removeEventListener('keydown', this.onModalKeydown);
  }

  onModalKeydown = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { webformatURL, largeImageURL, tags } = this.props.item;
    return (
      <Item>
        <IMG src={webformatURL} alt={tags} onClick={this.openModal} />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onModalClose={this.closeModal}
          />
        )}
      </Item>
    );
  }
}



