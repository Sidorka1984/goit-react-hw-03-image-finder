import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../services/api";
import Button from "./Button/Button.jsx";
import Container from "./Container/Container.jsx";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import Modal from "./Modal/Modal.jsx";
import ImageLoader from "./Loader/Loader.jsx";
import Searchbar from "./Searchbar/Searchbar.jsx";
// import onError from './Error';

class App extends Component {
  state = {
    page: 1,
    query: "",
    images: [],
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
      toast.error("Please enter a valid request");
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    return api.findImage(query, page).then((images) => {
      if (images.length > 10) {
        return toast("Too many matches found.", { icon: "⚠️" });
      }
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
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormData = ({ query }) => {
    this.setState({
      page: 1,
      query,
      images: [],
    });
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

  toggleModal = () =>
    this.setState((prevState) => ({ showModal: !prevState.showModal }));

  hideLoaderInModal = () => this.setState({ isLoading: false });

  render() {
    const { images, isLoading, showModal, url, tag } = this.state;

    const showMoreBtn = isLoading && !showModal;
    return (
      <Container>
        <Toaster autoClose={4000} position="top-right" />
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
