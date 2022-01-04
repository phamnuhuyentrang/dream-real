import React from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { ScrollView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { navigation } from '../navigation-root';
import Comment from './comment';


const screen = Dimensions.get("screen");

const CommentLayout = (props) => {
    const comments = props.comments
    const ref = React.createRef();
    const scrollRef = React.createRef();
    const [isEnable, setEnable] = React.useState(false);
    const [containerTop, setContainerTop] = React.useState(0);
    var _containerTop = new Animated.Value(0);

    const _onScrollDown = React.useCallback((event) => {
        if (!this.state.enable) return;
        const { translationY } = event.nativeEvent;
        _containerTop.setValue(translationY)
    }, [])

    const _onScroll = React.useCallback(({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y <= 0 && !isEnable) {
            setEnable(true);
        }
        if (nativeEvent.contentOffset.y > 0 && isEnable) {
            setEnable(false);
        }
    }, [])

    const _onHandlerStateChangeHandler = React.useCallback(({ nativeEvent }) => {
        if (!isEnable) return;
        const { translationY, state } = nativeEvent;
        if (state === State.END) {
            if (translationY <= 500) {
                Animated.timing(_containerTop, {
                    toValue: 0,
                    duration: 200,
                }).start()
            } else {
                navigation.goBack()
            }
        }
    }, [])

    const onPressBtnBackHandler = () => {
        navigation.goBack()
    }

    return (
        <View>
            <View style={styles.backdrop}>
                <KeyboardAvoidingView behavior="height" enabled style={{ ...styles.keyboardAvoidingContainer }}>
                <Animated.View style={{ ...styles.wrapper, top: _containerTop }} >
                        <View style={styles.navigationStackBar}>
                            <TouchableOpacity onPress={onPressBtnBackHandler} style={styles.btnBack}>
                                <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
                            </TouchableOpacity>
                            <View style={styles.stackBarTitle}>
                                <Text style={{ fontSize: 16 }}>Comments</Text>
                            </View>
                        </View>
                        <PanGestureHandler
                            onHandlerStateChange={_onHandlerStateChangeHandler}
                            enabled={isEnable}
                            ref={ref}
                            activeOffsetY={5}
                            failOffsetY={-5}
                            onGestureEvent={_onScrollDown}
                        >
                            <ScrollView
                                ref={scrollRef}
                                waitFor={isEnable ? ref : scrollRef}
                                scrollEventThrottle={40}
                                onScroll={_onScroll} style={styles.container}
                            >
                                {comments.map((comment, index) => (
                                    <Comment key={index} comment={comment}>Detail</Comment>
                                ))}
                            </ScrollView>
                        </PanGestureHandler>
                        <View style={styles.commentInputWrapper}>
                            <TouchableOpacity style={styles.cameraIconWrapper}>
                                <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
                            </TouchableOpacity>
                            <View style={styles.textInputWrapper}>
                                <TextInput autoFocus={true} style={styles.textInput}>

                                </TextInput>
                            </View>
                            <View style={styles.iconWrapper}>
                                <TouchableOpacity style={styles.iconItem}>
                                    <FontAwesome5Icon name="grip-horizontal" size={20}></FontAwesome5Icon>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconItem}>
                                    <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

const STACK_NAVBAR_HEIGHT = 48
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        height: screenHeight,
        zIndex: 2
    },
    wrapper: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%'
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1
    },
    container: {
        padding: 10,
        marginBottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT + 50,
        backgroundColor: '#ffffff',
    },
    commentInputWrapper: {
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT,
        left: 0,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconItem: {
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraIconWrapper: {
        backgroundColor: '#ddd',
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputWrapper: {
        height: 40,
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
        backgroundColor: '#ddd',
        marginLeft: 10,
        width: screenWidth - 40 - 80 - 30 - 10,
        borderRightWidth: 0
    },
    textInput: {
        width: "100%",
        height: 40,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    iconWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopRightRadius: 48,
        borderBottomRightRadius: 48,
        height: 40,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0
    },
    navigationStackBar: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btnBack: {
        zIndex: 99
    },
    stackBarTitle: {
        position: 'absolute',
        width: screenWidth,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    }
})

export default CommentLayout;