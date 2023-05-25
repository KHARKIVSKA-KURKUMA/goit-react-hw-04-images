const BASE_URL =
  'https://pixabay.com/api/?key=34885116-6d9c2e4d5b1555007e59a700b';

export const getSearchPic = (query, page = `1`) => {
  return fetch(
    `${BASE_URL}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Something wrong...'));
  });
};
