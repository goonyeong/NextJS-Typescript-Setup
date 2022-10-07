import axios from "axios";

const API_URL = "http://localhost:3000";

export const TMBD_API_URL = "https://image.tmdb.org/t/p/original";

export const TMBD_API_KEY = "2aba01b0fce18e86ed1cee2e83403b06";

export const getNameData = async () => {
  const { data } = await axios({
    method: "get",
    url: `${API_URL}/api/name`,
  });

  return data;
};

export const postNameData = async () => {
  const { data } = await axios({
    method: "post",
    url: `${API_URL}/api/name`,
    data: "John",
  });

  return data;
};

export const getArtistData = async () => {
  const { data } = await axios({
    method: "get",
    url: `${API_URL}/api/artist`,
  });

  return data;
};

export const getMovieName = async () => {
  const { data } = await axios({
    method: "get",
    url: "https://api.themoviedb.org/3/movie/550",
    params: {
      api_key: TMBD_API_KEY,
    },
  });

  return data;
};

export const getMovieDetail = async (id: number) => {
  const { data } = await axios({
    method: "get",
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: {
      api_key: TMBD_API_KEY,
    },
  });

  return data;
};
