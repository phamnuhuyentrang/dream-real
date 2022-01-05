import React from 'react'
import { Animated, StyleSheet, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const screen = Dimensions.get("screen");

export const CircleListLayout = ({
    calcHeight,
    containerStyle,
    displayData,
    keyExtractor,
    panHandlers,
    renderItem,
    state,
    visibleDataBounds,
}) => (
    <View {...panHandlers} style={[styles.container, { height: calcHeight() }, containerStyle]}>
        <View style={styles.wrapper}>
            {displayData.map((item, index) => {
                const scale = state[`scale${index}`]
                const translateX = state[`translateX${index}`]
                const translateY = state[`translateY${index}`]
                const { _dataIndex, ...itemToRender } = item

                return (
                    translateX &&
                    translateY &&
                    visibleDataBounds &&
                    visibleDataBounds.includes(_dataIndex) && (
                        <Animated.View
                            key={keyExtractor(item, index)}
                            style={[
                                styles.renderItemContainer,
                                {
                                    transform: [{ translateX }, { translateY }, { scale }],
                                },
                                {marginTop: screen.height * screen.height / (13 * 829 )}
                            ]}
                        >
                            {renderItem({ item: itemToRender, index: item._dataIndex })}
                        </Animated.View>
                    )
                )
            })}
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        overflow: 'hidden',
    },
    renderItemContainer: {
        position: 'absolute',
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginTop: 10,
    },
})

CircleListLayout.propTypes = {
    calcHeight: PropTypes.func.isRequired,
    containerStyle: PropTypes.object,
    displayData: PropTypes.array,
    keyExtractor: PropTypes.func.isRequired,
    panHandlers: PropTypes.object.isRequired,
    renderItem: PropTypes.func.isRequired,
    state: PropTypes.object,
    visibleDataBounds: PropTypes.array,
}
