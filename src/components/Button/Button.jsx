import React from 'react';
import { LoadMore } from './Button.styled';

export default function Button({ click }) {
  return <LoadMore onClick={click}>Load More</LoadMore>;
}
