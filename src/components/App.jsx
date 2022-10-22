import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Component } from "react";
import { StyledApp } from "./AppStyled";
import { GlobalNormalize } from "./Styled/GlobalNormalize";
import { Loader } from "./Loader/Loader";


export class App extends Component {
  state = {
    query: '',
    loading: false,
  };

  updateQuery = text => {
    this.setState({ query: text });
  };

  render() {
    const { loading, query } = this.state;

    return (
      <StyledApp>
        <SearchBar onSubmit={this.updateQuery} />
        <ImageGallery query={query} />
        {loading && <Loader />}
        <GlobalNormalize />
      </StyledApp>
    );
  }
}
