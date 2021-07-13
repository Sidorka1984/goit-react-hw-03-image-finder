import React from "react";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClick }) => (
  <ul className={styles.ImageGallery} onClick={onClick}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);

export default ImageGallery;
