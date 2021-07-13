// import "./App.css";
import React, { Component } from "react";
// import toast, { Toaster } from "react-hot-toast";
import Container from "./component/Container/Container.jsx";
import "./App.module.css";
import api from "./services/api";
import Searchbar from "./component/Searchbar/Searchbar";
import ImageGallery from "./component/ImageGallery/ImageGallery";
import ImageLoader from "./component/Loader/Loader";
import Button from "./component/Button/Button";
import Modal from "./component/Modal/Modal";
// import onError from './component/Error';
// import image from './component/images/pendingImage.png';
// import { loader } from "mini-css-extract-plugin";

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: "",
    isLoading: false,
    showModal: false,
    url: "",
    tag: "",
  };
  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (query !== prevState.query) {
      this.fetchImages()
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    return api.findImage(query, page).then((images) => {
      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
      }));
    });
  };

  handleOnButtonClick = () => {
    this.fetchImages()
      .then(() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      )
      .catch((error) => alert(error))
      .finally(() => this.setState({ loader: false }));
  };

  handleImageClick = ({ target }) => {
    if (target.nodeName !== "IMG") {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    this.setState({
      url,
      tag,
      isLoading: true,
    });
    this.toggleModal();
  };

  handleFormData = ({ query }) => {
    this.setState({ query, page: 1, images: [] });
  };

  toggleModal = () =>
    this.setState((prevState) => ({ showModal: !prevState.showModal }));

  hideLoaderInModal = () => this.setState({ isLoading: false });

  render() {
    const { images, isLoading, showModal, url, tag } = this.state;
    const showMoreBtn = isLoading && !showModal;
    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
            {isLoading && <ImageLoader />}
            <img src={url} alt={tag} onLoad={this.hideLoaderInModal} />
          </Modal>
        )}
        <Searchbar onSubmit={this.handleFormData} />
        <ImageGallery images={images} onClick={this.handleImageClick} />
        {showMoreBtn && images.length !== 0 && <ImageLoader />}
        {!isLoading && images[0] && (
          <Button onClick={this.handleOnButtonClick} />
        )}
      </Container>
    );
  }
}
export default App;
