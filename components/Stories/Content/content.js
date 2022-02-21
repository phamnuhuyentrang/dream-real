import React, { PureComponent } from 'react'
import { View, Dimensions, Alert } from "react-native"
import Carousel from 'react-native-snap-carousel'

import CustomBar from '../../statusbar';
import ContentItem from './content_items'
import userIdProvider from "../../../components/Context/user_id_provider"
import axios from "axios"

const screen = Dimensions.get("screen");
const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

const StoryContent = (props) => {
  const isCarousel = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [end, setEnd] = React.useState(false)
  const [item_index, setItemIndex] = React.useState(0);
  const userId = props.route.params.user_id;
  const user = React.useContext(userIdProvider);

  React.useEffect(() => {
    if (loading) {
        axios.get(global.back_end_url + '/album_user', {
            params: { user_id: user.id, offset: offset, user_react_id: userId },
            withCredentials: true 
        }).then((response) => {
            let json = JSON.parse(JSON.stringify(response.data));
            if (json.success) {
                if (json.albums.length < 10 ) {
                    setEnd(true)
                } 
                setData([...data, ...json.albums])
                setLoading(false)
                setOffset(offset + 10)
            }
            else {
                Alert.alert("Dream Real Loading Posts Error", json.message)
            }
        })
        .catch((error) => Alert.alert("Dream Real Loading Error", error))
    }  
  }, [loading])

  return (
    <View style={{flex: 1}}>
      <CustomBar backgroundColor="#252a38" barStyle="light-content" />
      <View style={{backgroundColor: "#252a38", height: screen.height}}>
        {data.length > 0 && <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={data}
            renderItem={ContentItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
            onSnapToItem={index => {
              setItemIndex(index);
            }}
            onScrollEndDrag={event => {
              const { contentSize, contentOffset } = event.nativeEvent;
              if (item_index === data.length-1 && contentOffset.x >= contentSize.width * ((data.length - 1) / data.length) && end == false) {
                setLoading(true);
              }
            }}
        />}
      </View>
    </View>
  )
}


export default StoryContent