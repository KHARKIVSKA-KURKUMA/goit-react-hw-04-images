import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      searchQuery: '',
    });
    this.props.searchValue(this.state.searchQuery);
  };
  handleChange = ({ currentTarget: { value } }) => {
    this.setState({ searchQuery: value });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <Header>
        <Form onSubmit={this.onSubmit}>
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
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}
