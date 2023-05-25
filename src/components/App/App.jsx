import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    searchText: '',
  };
  formSubmit = searchQuery => {
    this.setState({
      searchText: searchQuery,
    });
  };
  render() {
    return (
      <Container>
        <ToastContainer autoClose={1500} theme="colored" />
        <Searchbar searchValue={this.formSubmit}></Searchbar>
        <ImageGallery searchText={this.state.searchText}></ImageGallery>
      </Container>
    );
  }
}

export default App;
