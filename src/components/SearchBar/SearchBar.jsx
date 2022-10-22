import Notiflix from "notiflix";
import { Component } from "react";
import {
  StyledSearchBar,
  StyledForm,
  StyledButton,
  StyledButtonLabel,
  StyledInput,
} from './SearchBarStyled';
import { FaSearch } from 'react-icons/fa';


export class SearchBar extends Component {
    state = {
        query: '',
    };

    handleChange = e => {
        this.setState({ query: e.currentTarget.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            return Notiflix.Notify.warning('Будь ласка, введіть запит у пошуку ');
        }
        this.props.onSubmit(this.state.query);
        this.reset();
    };

    reset = () => {
        this.setState({ query: '' });
    }

    render() {
        return (
          <StyledSearchBar>
            <StyledForm onSubmit={this.handleSubmit}>
              <StyledButton type="submit">
                <FaSearch />
                <StyledButtonLabel>Search</StyledButtonLabel>
              </StyledButton>

              <StyledInput
                className="input"
                type="text"
                placeholder="Search images and photos"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </StyledForm>
          </StyledSearchBar>
        );
    }
}