import { Movie } from "../types/Movie";
import styles from "./MovieList.module.css";
import Link from "next/link"; // Import Link

type MovieListProps = {
    movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
    return (
        <div className={styles.movielist}>
            <h2>{movies.length} movies found</h2>
            <div className={styles.movies}>
                {movies.map(movie => (
                    <div key={movie.imdbID} className={styles.movie}>
                        <Link href={`/movies/${movie.imdbID}`}>
                            <div className={styles.moviePoster}>
                                <img src={movie.Poster} alt={movie.Title} />
                            </div>
                        </Link>
                        <div className={styles.movieTitle}>{movie.Title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
