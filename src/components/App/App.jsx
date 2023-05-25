import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ToastContainer } from 'react-toastify';
import Context from 'components/Context/SearchQueryContext';

const App = () => {
  return (
    <Container>
      <ToastContainer autoClose={1500} theme="colored" />
      <Context>
        <Searchbar></Searchbar>
        <ImageGallery></ImageGallery>
      </Context>
    </Container>
  );
};

export default App;
