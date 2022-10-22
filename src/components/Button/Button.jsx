import { StyledButton } from './StyledButton';

export const Button = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load More
    </StyledButton>
  );
};