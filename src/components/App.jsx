import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Component } from "react";






export class App extends Component {
  state = {
    query: '',
  };

  updateQuery = text => {
    this.setState({ query: text });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.updateQuery} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
