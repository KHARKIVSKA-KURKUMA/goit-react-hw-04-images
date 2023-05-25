import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const App = () => {
  /* ---------------------------------- STATE --------------------------------- */
  const [searchText, setSearchText] = useState('');
  /* --------------------------------- SUBMIT --------------------------------- */
  const formSubmit = searchQuery => {
    setSearchText(searchQuery);
  };
  /* --------------------------------- RENDER --------------------------------- */
  return (
    <Container>
      <ToastContainer autoClose={1500} theme="colored" />
      <Searchbar searchValue={formSubmit}></Searchbar>
      <ImageGallery searchText={searchText}></ImageGallery>
    </Container>
  );
};

export default App;
