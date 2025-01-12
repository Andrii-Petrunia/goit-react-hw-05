import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmM1MmIwZWU4YWM3ZjI5MGYzMzU4OThiNDc3MmMzMCIsIm5iZiI6MTczNjcwMjU3Ny43NDgsInN1YiI6IjY3ODNmYTcxMTQzMWUwNTkxYWJiOGYxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7wEEwmfs0cpznyo7BY9JnAPcGmxYvk7DtMQjYr0uadQ";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;

export async function getTrendingMovies() {
  const { data } = await axios.get(`/trending/movie/day`);
  return data.results;
}

export async function searchMovies(query) {
  const { data } = await axios.get(`/search/movie`, {
    params: { query, include_adult: false, language: "en-US", page: 1 },
  });
  return data.results;
}

export async function getMovieDetails(movieId) {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
}

export async function getMovieCast(movieId) {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data.cast;
}

export async function getMovieReviews(movieId) {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data.results;
}
