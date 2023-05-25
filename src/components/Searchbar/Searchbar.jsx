import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import React, { useState } from 'react';

const Searchbar = ({ searchValue }) => {
  /* ---------------------------------- STATE --------------------------------- */
  const [searchQuery, setSearchQuery] = useState('');
  /* --------------------------------- SUBMIT --------------------------------- */
  const onSubmit = e => {
    e.preventDefault();
    setSearchQuery('');
    searchValue(searchQuery);
  };
  /* --------------------------------- CHANGE --------------------------------- */
  const handleChange = ({ currentTarget: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };
  /* --------------------------------- RENDER --------------------------------- */
  return (
    <Header>
      <Form onSubmit={onSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          name="searchQuery"
          value={searchQuery}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;
