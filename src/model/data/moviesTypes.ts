interface Movie {
  overview: string;
  title: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  original_title: string;
  id: number;
}

interface MoviesTypes {
  pending: boolean;
  topRatedMovies: Movie[];
  popularMovies: Movie[];
  movieDetailData: object;
}

export type { MoviesTypes, Movie };
