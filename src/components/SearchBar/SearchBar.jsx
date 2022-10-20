import Notiflix from "notiflix";
import { Component } from "react";

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
          <header className="searchbar">
            <form className="form" onSubmit={this.handleSubmit}>
              <button type="submit" className="button">
                <span className="button-label">Search</span>
              </button>

              <input
                className="input"
                type="text"
                placeholder="Search images and photos"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </form>
          </header>
        );
    }
}