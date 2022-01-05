import React, { PureComponent } from 'react'
import { View, Dimensions } from "react-native"
import Carousel from 'react-native-snap-carousel'
import ContentItem from './content_items'

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

const StoryContent = (props) => {
  const isCarousel = React.useRef(null);
  const data = props.route.params.post;
  const dataArray = data.map(function(el) {
    var o = Object.assign({}, el);
    o.name = props.route.params.name;
    o.avatar = props.route.params.avatar;
    return o;
  })
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