import React from 'react';
import { GalleryItem } from './ImageGallery.styled';

const ImageGalleryItem = ({ id, src, alt, bigImgUrl }) => {
  return (
    <GalleryItem>
      <img src={src} alt={alt} data-img={bigImgUrl} />
    </GalleryItem>
  );
};
export default ImageGalleryItem;
