import { getSearchPic } from 'api/getSearchPic';
import { GalleryList } from './ImageGallery.styled';
import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    visible: false,
    bigImg: '',
    err: 'Undefined error',
    status: 'idle',
    totalHits: 0,
  };
  /* -------------------------------------------------------------------------- */
  componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.searchText.toLowerCase().trim();
    if (prevProps.searchText !== searchQuery && searchQuery) {
      this.setState({ status: 'pending' });
      getSearchPic(searchQuery)
        .then(pictures => {
          if (pictures.hits.length > 0) {
            this.setState({
              pictures: pictures.hits,
              status: 'resolved',
              totalHits: pictures.total,
            });
          } else {
            this.setState({ status: 'idle', pictures: [] });
            toast.error('Enter correct query');
          }
        })
        .catch(err => {
          this.setState({ err, status: 'rejected' });
        });
    }
  }
  /* -------------------------------------------------------------------------- */
  handleClick = () => {
    const searchQuery = this.props.searchText.toLowerCase().trim();
    getSearchPic(searchQuery, this.state.page + 1)
      .then(data =>
        this.setState(prevState => ({
          page: prevState.page + 1,
          pictures: [...prevState.pictures, ...data.hits],
        }))
      )
      .catch(error => {
        this.setState({ err: error, status: 'rejected' });
      });
  };
  /* -------------------------------------------------------------------------- */
  openModal = e => {
    if (e.target === e.currentTarget) {
      return;
    }
    this.setState({
      visible: true,
      bigImg: e.target.dataset.img,
    });
    document.body.style.overflow = 'hidden';
  };
  /* -------------------------------------------------------------------------- */
  closeModal = () => {
    this.setState({ visible: false });
    document.body.style.overflow = 'scroll';
  };
  /* -------------------------------------------------------------------------- */
  render() {
    const pictures = this.state.pictures;
    if (this.state.status === 'pending') {
      return <Loader visible={true}></Loader>;
    }
    if (this.state.status === 'rejected') {
      return toast.error(`${this.state.err}`);
    }
    if (this.state.status === 'resolved') {
      return (
        <>
          <GalleryList onClick={this.openModal}>
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
          {pictures.length < this.state.totalHits && (
            <Button click={this.handleClick}></Button>
          )}
          {this.state.visible && (
            <Modal onClose={this.closeModal} bigImg={this.state.bigImg}></Modal>
          )}
        </>
      );
    }
  }
}
