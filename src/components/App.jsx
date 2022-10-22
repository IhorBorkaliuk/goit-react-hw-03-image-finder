import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Component } from "react";
import { StyledApp } from "./AppStyled";
import { GlobalNormalize } from "./Styled/GlobalNormalize";


export class App extends Component {
  state = {
    query: '',
  };

  updateQuery = text => {
    this.setState({ query: text });
  };

  render() {
    const { query } = this.state;

    return (
      <StyledApp>
        <SearchBar onSubmit={this.updateQuery} />
        <ImageGallery query={query} />
        <GlobalNormalize />
      </StyledApp>
    );
  }
}
