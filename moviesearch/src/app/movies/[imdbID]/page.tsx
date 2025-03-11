import { MovieDetail } from "@/app/types/MovieDetail";
import MovieDetailView from "@/app/components/MovieDetailView";





async function getMovieDetail(imdbID: string): Promise<MovieDetail | null> {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=cd2aa4ca&i=${imdbID}&plot=full`);
        if (!response.ok) {
            console.error(`API request failed with status: ${response.status}`);
            return null;
        }
        const data = await response.json();
        if (!data || data.Response === "False") {
            console.error("Fehlerhafte API-Antwort:", data);
            return null;
        }
        return data;
    } catch (error) {
        console.error("Fehler beim Abrufen der Filmdetails:", error);
        return null;
    }
}

export default async function MovieDetailPage({ params }: { params: { imdbID: string } }) {
    const movie = await getMovieDetail(params.imdbID);

    if (!movie) {
        return <p>Film nicht gefunden oder fehlerhafte API-Antwort.</p>;
    }

    return <MovieDetailView movie={movie} />;
}
