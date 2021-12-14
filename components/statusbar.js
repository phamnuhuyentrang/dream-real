import React from 'react';
import { View, StatusBar, } from 'react-native';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
  
const CustomBar = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ height: insets.top, backgroundColor: "#3d3d4e" }}>
            <StatusBar animated={true}
                    backgroundColor={"#3d3d4e"}
                    barStyle={"dark-content"} />
        </View>
    )
};
  
export default CustomBar;
