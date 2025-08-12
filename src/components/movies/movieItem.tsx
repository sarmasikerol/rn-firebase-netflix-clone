//import liraries
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { defaultScreenStyle } from '../../styles/defaultScreenStyle';
import { MovieItemProps } from '../../model/ui/movieItem';
import CustomImage from '../ui/customImage';
import { useNavigation } from '@react-navigation/native';
import { MOVIESDETAIL } from '../../utils/routes';

// create a component
const MovieItem: React.FC<MovieItemProps> = props => {
  const { item, type } = props;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(MOVIESDETAIL, { 
        movieId: item.id, // ID olarak gönderiyoruz
        type: type // type parametresini de gönderiyoruz
      })}
      style={defaultScreenStyle.container}
    >
      <CustomImage
        path={item.poster_path}
        style={{
          width: 150,
          height: 150,
          resizeMode: 'contain',
        }}
      />
      <Text style={{ color: 'white' }}>{item.title}</Text>
    </Pressable>
  );
};

//make this component available to the app
export default MovieItem;