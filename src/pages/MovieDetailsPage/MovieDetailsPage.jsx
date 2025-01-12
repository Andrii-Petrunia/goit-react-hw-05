import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return null;

  const backLink = location.state?.from || "/movies";

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.backButton}>
        Go back
      </Link>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={styles.links}>
        <Link to="cast" state={{ from: backLink }}>
          Cast
        </Link>
        <Link to="reviews" state={{ from: backLink }}>
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
