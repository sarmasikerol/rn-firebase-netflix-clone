interface Tv {
  overview: string;
  title: string;
  release_date: string;
  popularity: number;
  poster_path: string;
  original_title: string;
}

interface TvTypes {
  pending: boolean;
  topRatedTv: Tv[];
  popularTv: Tv[];
  tvDetailData: object;
}

export type { TvTypes, Tv };
