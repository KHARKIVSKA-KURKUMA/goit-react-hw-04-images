import { getSearchPic } from 'api/getSearchPic';
import { GalleryList } from './ImageGallery.styled';
import React, { Component, useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

// export default class ImageGallery extends Component {
//   state = {
//     pictures: [],
//     page: 1,
//     visible: false,
//     bigImg: '',
//     err: 'Undefined error',
//     status: 'def',
//     totalHits: 0,
//   };
//   /* -------------------------------------------------------------------------- */
//   componentDidUpdate(prevProps, prevState) {
//     const searchQuery = this.props.searchText.toLowerCase().trim();
//     console.log(searchQuery);
//     if (prevProps.searchText !== searchQuery && searchQuery) {
//       this.setState({ status: 'pending' });
//       getSearchPic(searchQuery)
//         .then(pictures => {
//           if (pictures.hits.length > 0) {
//             this.setState({
//               pictures: pictures.hits,
//               status: 'resolved',
//               totalHits: pictures.total,
//             });
//           } else {
//             this.setState({ status: 'def', pictures: [] });
//             toast.error('Enter correct query');
//           }
//         })
//         .catch(err => {
//           this.setState({ err, status: 'rejected' });
//         });
//     }
//   }
//   /* -------------------------------------------------------------------------- */
//   handleClick = () => {
//     const searchQuery = this.props.searchText.toLowerCase().trim();
//     getSearchPic(searchQuery, this.state.page + 1)
//       .then(data =>
//         this.setState(prevState => ({
//           page: prevState.page + 1,
//           pictures: [...prevState.pictures, ...data.hits],
//         }))
//       )
//       .catch(error => {
//         this.setState({ err: error, status: 'rejected' });
//       });
//   };
//   /* -------------------------------------------------------------------------- */
//   openModal = e => {
//     if (e.target === e.currentTarget) {
//       return;
//     }
//     this.setState({
//       visible: true,
//       bigImg: e.target.dataset.img,
//     });
//     document.body.style.overflow = 'hidden';
//   };
//   /* -------------------------------------------------------------------------- */
//   closeModal = () => {
//     this.setState({ visible: false });
//     document.body.style.overflow = 'scroll';
//   };
//   /* -------------------------------------------------------------------------- */
//   render() {
//     const pictures = this.state.pictures;
//     if (this.state.status === 'pending') {
//       return <Loader visible={true}></Loader>;
//     }
//     if (this.state.status === 'rejected') {
//       return toast.error(`${this.state.err}`);
//     }
//     if (this.state.status === 'resolved') {
//       return (
//         <>
//           <GalleryList onClick={this.openModal}>
//             {pictures &&
//               pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
//                 <ImageGalleryItem
//                   key={id}
//                   src={webformatURL}
//                   alt={tags}
//                   bigImgUrl={largeImageURL}
//                 />
//               ))}
//           </GalleryList>
//           {pictures.length < this.state.totalHits && (
//             <Button click={this.handleClick}></Button>
//           )}
//           {this.state.visible && (
//             <Modal onClose={this.closeModal} bigImg={this.state.bigImg}></Modal>
//           )}
//         </>
//       );
//     }
//   }
// }

const ImageGallery = ({ searchText }) => {
  /* ---------------------------------- STATE --------------------------------- */
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [status, setStatus] = useState('def');
  const [totalHits, setTotalHits] = useState(0);
  /* ------------------------------- USE EFFECT ------------------------------- */
  useEffect(() => {
    const searchQuery = searchText.toLowerCase().trim();
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
  }, [searchText]);

  /* ---------------------------------- CLICK --------------------------------- */
  const handleClick = () => {
    const searchQuery = searchText.toLowerCase().trim();
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
