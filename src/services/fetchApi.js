import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "3fac70260a5a4a0cc9324207af7f9c8c"; // Replace with your actual TMDB API key

let headers = {
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json;charset=utf-8',
};

const fetchApi = (data) => {
  return axios.get(
    `${baseUrl}${data.path}`,
    { 
      headers,
      params: data?.params,
    }
  );
};

export const postFetchApi = (data) => {
  return axios.post(
    `${baseUrl}${data.path}`,
    data?.params,
    {
      headers,
    }
  );
};

export default fetchApi;
