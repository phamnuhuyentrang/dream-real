import React, { PureComponent } from 'react'
import {View, ImageBackground, Dimensions} from 'react-native'

const window = Dimensions.get("window");

class DestinationDetails extends PureComponent  {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground source={this.props.route.params.place} style={{
                    height: window.width, 
                    width: window.height, 
                    transform: [
                        { rotate: '90deg' }
                    ]
                }} />
            </View>
        )
    }
} 

export default DestinationDetails;