import { getSearchPic } from 'api/getSearchPic';
import { GalleryList } from './ImageGallery.styled';
import React, { useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { useCustomContext } from 'components/Context/SearchQueryContext';

const ImageGallery = () => {
  const searchResult = useCustomContext();
  /* ---------------------------------- STATE --------------------------------- */
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [status, setStatus] = useState('def');
  const [totalHits, setTotalHits] = useState(0);
  /* ------------------------------- USE EFFECT ------------------------------- */
  useEffect(() => {
    const searchQuery = searchResult.searchText.toLowerCase().trim();
    if (searchQuery) {
      setStatus('pending');
      getSearchPic(searchQuery)
        .then(pictures => {
          if (pictures.hits.length > 0) {
            setPictures(pictures.hits);
            setStatus('resolved');
            setTotalHits(pictures.total);
          } else {
            setStatus('def');
            setPictures([]);
            toast.error('Enter correct query');
          }
        })
        .catch(err => {
          setStatus('rejected');
        });
    }
  }, [searchResult.searchText]);

  /* ---------------------------------- CLICK --------------------------------- */
  const handleClick = () => {
    const searchQuery = searchResult.searchText.toLowerCase().trim();
    getSearchPic(searchQuery, page + 1)
      .then(data => {
        setPage(prev => prev + 1);
        setPictures(prev => [...prev, ...data.hits]);
      })
      .catch(error => {
        setStatus('rejected');
      });
  };
  /* ------------------------------- OPEN MODAL ------------------------------- */
  const openModal = e => {
    if (e.target === e.currentTarget) {
      return;
    }
    setVisible(true);
    setBigImg(e.target.dataset.img);
    document.body.style.overflow = 'hidden';
  };
  /* ------------------------------- CLOSE MODAL ------------------------------ */
  const closeModal = () => {
    setVisible(false);
    document.body.style.overflow = 'scroll';
  };
  /* --------------------------------- RENDER --------------------------------- */
  if (status === 'pending') {
    return <Loader visible={true}></Loader>;
  } else if (status === 'rejected') {
    return toast.error('Enter correct query');
  } else if (status === 'resolved') {
    return (
      <>
        <GalleryList onClick={openModal}>
          {pictures &&
            pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                alt={tags}
                bigImgUrl={largeImageURL}
              />
            ))}
        </GalleryList>
        {pictures.length < totalHits && <Button click={handleClick}></Button>}
        {visible && <Modal onClose={closeModal} bigImg={bigImg}></Modal>}
      </>
    );
  }
};

export default ImageGallery;
