//import liraries
import React from 'react';
import { Image } from 'react-native';
import { IMAGE_BASE_URL } from '../../service/urls';
import { TOKEN } from '../../utils/constants';
import { customImageProps } from '../../model/ui/customImage';

// create a component
const CustomImage: React.FC<customImageProps> = props => {
  const { path, style } = props;
  console.log(`${IMAGE_BASE_URL}${path}`);
  return (
    <Image
      source={{
        uri: `${IMAGE_BASE_URL}${path}`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      }}
      style={style}
    />
  );
};

//make this component available to the app
export default CustomImage;
