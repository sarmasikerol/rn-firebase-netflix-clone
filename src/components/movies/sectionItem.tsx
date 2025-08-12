//import liraries
import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { SectionItemProps } from '../../model/ui/sectionItem';
import SectionTitle from '../ui/sectionTitle';
import MovieItem from './movieItem';
import { useDispatch, useSelector } from 'react-redux';
import { sections } from '../../utils/constants';
import { getPopularTv, getTopRatedTv } from '../../store/actions/tvActions';
import {
  getPopularMovies,
  getTopRatedMovies,
} from '../../store/actions/moviesActions';
import type { AppDispatch, RootState } from '../../store';

// create a component
const SectionItem: React.FC<SectionItemProps> = ({ sectionItem }) => {
  const topRatedMovies = useSelector(
    (state: RootState) => state.movies.topRatedMovies,
  );
  const { topRatedTv, popularTv } = useSelector((state: RootState) => state.tv);
  const { popularMovies } = useSelector((state: RootState) => state.movies);

  const dispatch = useDispatch<AppDispatch>();

  const getReturnData = () => {
    if (sectionItem.section == sections.TOPRATEDTV) {
      return topRatedTv;
    } else if (sectionItem.section == sections.TOPRATEDMOVIES) {
      return topRatedMovies;
    } else if (sectionItem.section == sections.POPULERMOVIES) {
      return popularMovies;
    } else if (sectionItem.section == sections.POPULERTV) {
      return popularTv;
    }
  };

  useEffect(() => {
    if (sectionItem.section === sections.TOPRATEDTV) {
      dispatch(getTopRatedTv());
    } else if (sectionItem.section === sections.TOPRATEDMOVIES) {
      dispatch(getTopRatedMovies());
    } else if (sectionItem.section === sections.POPULERMOVIES) {
      dispatch(getPopularMovies());
    } else if (sectionItem.section === sections.POPULERTV) {
      dispatch(getPopularTv());
    }
  }, []);

  return (
    <View>
      <SectionTitle title={sectionItem.title} />
      <FlatList
        horizontal
        data={getReturnData()}
        renderItem={({ item }) => (
          <MovieItem item={item} type={sectionItem.type} />
        )}
      />
    </View>
  );
};

//make this component available to the app
export default SectionItem;
