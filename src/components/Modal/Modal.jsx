import PropTypes from 'prop-types';
import { StyledModal, Overlay } from './ModalStyled';

export const Modal = ({ largeImageURL, tags, onModalClose }) => {
  return (
    <Overlay
      onClick={e => {
        if (e.target === e.currentTarget) onModalClose();
      }}
    >
      <StyledModal>
        <img src={largeImageURL} alt={tags} />
      </StyledModal>
    </Overlay>
  );
};


Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};