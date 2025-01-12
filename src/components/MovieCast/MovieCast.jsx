import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieCast.module.css";
import { getMovieCast } from "../../services/api";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.item}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className={styles.image}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
