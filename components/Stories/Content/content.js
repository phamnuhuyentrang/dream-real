import React, { PureComponent } from 'react'
import { View, Dimensions } from "react-native"
import Carousel from 'react-native-snap-carousel'
import ContentItem from './content_items'

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const StoryContent = (props) => {
  const isCarousel = React.useRef(null);
  const data = props.route.params.post;
  console.log(data)
  const dataArray = [data];
  return (
      <View>
          <Carousel
              layout="tinder"
              layoutCardOffset={9}
              ref={isCarousel}
              data={dataArray}
              renderItem={ContentItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              useScrollView={true}
          />
      </View>
  )
}


export default StoryContent