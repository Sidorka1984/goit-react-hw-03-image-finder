import React from "react";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => (
  <li className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      data-url={largeImageURL}
      className={styles.ImageGalleryItem__image}
    />
  </li>
);

export default ImageGalleryItem;
