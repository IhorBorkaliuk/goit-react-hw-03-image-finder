import { Component } from "react";

export class ImageGalleryItem extends Component {
state = {
    isModalOpen: false,
  };


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
    const { webformatURL, tags } = this.props.item;
    return (
<li className="gallery-item">
  <img src={webformatURL} alt={tags} />
</li>
    );
  }
}



