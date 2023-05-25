import styled from 'styled-components';

export const GalleryList = styled.ul`
  list-style: none;
  display: flex;
  gap: 15px;
  padding: 0;
  flex-wrap: wrap;
`;
export const GalleryItem = styled.li`
  width: calc((100% - 45px) / 3);
  img {
    width: 100%;
    height: 200px;
    border-radius: 4px;
    &:hover {
      transform: scale(1.03);
      cursor: zoom-in;
    }
  }
`;
