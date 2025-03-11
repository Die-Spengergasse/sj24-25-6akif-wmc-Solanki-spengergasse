import { MovieDetail } from "@/app/types/MovieDetail";

export default function MovieDetailView({ movie }: { movie: MovieDetail }) {
    return (
        <div>
            <h1>{movie.Title} ({movie.Year})</h1>
            <p>{movie.Plot}</p>
            <h3>Ratings:</h3>
            <ul>
                {movie.Ratings.map((rating, index) => (
                    <li key={index}>{rating.Source}: {rating.Value}</li>
                ))}
            </ul>
        </div>
    );
}
