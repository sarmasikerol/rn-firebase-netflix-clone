import { itemTypes, sections } from './constants';

export const homeData = [
  {
    id: 1,
    title: 'Top Rated Movies',
    section: sections.TOPRATEDMOVIES,
    type: itemTypes.MOVIE,
  },
  {
    id: 2,
    title: 'Trending TV Shows This Week',
    section: sections.TOPRATEDTV,
    type: itemTypes.TV,
  },
  {
    id: 3,
    title: 'Upcoming Releases',
    section: sections.POPULERMOVIES,
    type: itemTypes.MOVIE,
  },
  {
    id: 4,
    title: 'Popular This Week',
    section: sections.POPULERTV,
    type: itemTypes.TV,
  },
];
