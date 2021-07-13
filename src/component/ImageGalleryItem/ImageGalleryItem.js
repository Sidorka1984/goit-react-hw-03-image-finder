import styles from "./ImageGalleryItem.module.css";

//
// function ImageGalleryItem({
// webformatURL,
// largeImageURL,
// tags,
// onClick,
// }) {
// return (
// <li className={styles.ImageGalleryItem}>
// {/* <img */}
// src={webformatURL}
// alt={tags}
// data-url={largeImageURL}
// className={styles.ImageGalleryItem_image}
// onClick={onClick}
// />
// {/* </li> */}
// )
// }
//
// ImageGalleryItem.propTypes = {
// webformatURL: PropTypes.string,
// largeImageURL: PropTypes.string,
// tags: PropTypes.string,
// handleImageClick: PropTypes.func,
// }
//
// export default ImageGalleryItem

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
