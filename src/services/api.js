import axios from "axios";

const KEY = "21751714-0d98bde39df4a5d3fa6697446";
axios.defaults.baseURL = "https://pixabay.com/api/";

const findImage = (searchQuery, page) =>
  axios
    .get(
      `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);

export default { findImage };
