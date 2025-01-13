import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setError(null);
        const fetchedMovies = await searchMovies(query);
        setMovies(fetchedMovies);
      } catch {
        setError("Error fetching movies. Please try again.");
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchQuery = formData.get("query").trim();

    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      setSearchParams({});
      setMovies([]);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
