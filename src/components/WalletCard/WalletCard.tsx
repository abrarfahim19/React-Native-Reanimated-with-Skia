import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
const SIZE = 120;

export const WalletCard = () => {
  const {width, height} = useWindowDimensions();
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange(event => {
      offsetX.value += event.changeX;
      offsetY.value += event.changeY;
    })
    .onFinalize(event => {
      offsetX.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width / 2) + SIZE / 2, width / 2 - SIZE / 2],
      });

      offsetY.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: true,
        clamp: [-(height / 2) + SIZE / 2, height / 2 - SIZE / 2],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offsetX.value}, {translateY: offsetY.value}],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
