import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail } from '../../store/actions/moviesActions';
import { itemTypes } from '../../utils/constants';
import { getTvDetail } from '../../store/actions/tvActions';
import Colors from '../../theme';

const { width } = Dimensions.get('window');

const MoviesDetail: React.FC = ({ route }) => {
  // Hibrit yaklaşım: hem ID hem mevcut data
  const { movie: existingMovie, movieId, type } = route.params;
  const rawId = movieId || existingMovie;
  const finalMovieId = typeof rawId === 'object' ? rawId.id : rawId;
  console.log(movieId);

  console.log(existingMovie);
  const dispatch = useDispatch();

  // Store'dan movie detayını ve loading durumunu alıyoruz
  const movieDetail = useSelector(state =>
    type === 'MOVIE' || type === itemTypes.MOVIE
      ? state.movies.movieDetail
      : state.tv.tvDetail,
  );

  const loading = useSelector(state =>
    type === 'MOVIE' || type === itemTypes.MOVIE
      ? state.movies.pending
      : state.tv.pending,
  );

  useEffect(() => {
    if (finalMovieId) {
      if (type === 'MOVIE' || type === itemTypes.MOVIE) {
        dispatch(getMovieDetail(finalMovieId));
      } else if (type === 'TV' || type === itemTypes.TV) {
        dispatch(getTvDetail(finalMovieId));
      }
    }
  }, [finalMovieId, type, dispatch]);

  // Önce mevcut veriyi göster, sonra API'den geleni
  const displayMovie = movieDetail || existingMovie;

  // Hiç veri yoksa loading göster
  if (!displayMovie) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.WHITE} />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${
            displayMovie?.backdrop_path || ''
          }`,
        }}
        style={styles.backdrop}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <Text style={styles.headerTitle}>
          {displayMovie?.title || displayMovie?.name || 'Başlık Yok'}
        </Text>
      </ImageBackground>

      <View style={styles.content}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              displayMovie?.poster_path || ''
            }`,
          }}
          style={styles.poster}
        />

        <Text style={styles.originalTitle}>
          {displayMovie?.original_title ||
            displayMovie?.original_name ||
            'Orijinal Başlık Yok'}
        </Text>

        <Text style={styles.date}>
          Yayın Tarihi:{' '}
          {displayMovie?.release_date ||
            displayMovie?.first_air_date ||
            'Tarih Yok'}
        </Text>

        <Text style={styles.rating}>
          IMDB: ⭐ {displayMovie?.vote_average || 'N/A'}
        </Text>

        <Text style={styles.overview}>
          {displayMovie?.overview || 'Açıklama mevcut değil'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
  },
  backdrop: {
    width: '100%',
    height: 240,
    justifyContent: 'flex-end',
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerTitle: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 2,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  poster: {
    width: width * 0.6,
    height: width * 0.9,
    borderRadius: 12,
    marginBottom: 20,
  },
  originalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.WHITE,
    marginBottom: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: '#f1c40f',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'justify',
    lineHeight: 22,
    marginTop: 10,
  },
  // Loading stilleri
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.WHITE,
    fontSize: 16,
    marginTop: 10,
  },
});

export default MoviesDetail;
