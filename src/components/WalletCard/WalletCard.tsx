import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
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
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const offset = useSharedValue({
    x: width.value / 2 - SIZE / 2,
    y: height.value / 2 - SIZE / 2,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.height;
  };

  console.log(width.value, height.value);

  const pan = Gesture.Pan()
    .onChange(event => {
      offsetX.value += event.changeX;
      offsetY.value += event.changeX;
    })
    .onFinalize(event => {
      offsetX.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
      });

      offsetY.value = withDecay({
        velocity: event.velocityY,
        rubberBandEffect: true,
        clamp: [-(height.value / 2) + SIZE / 2, height.value / 2 - SIZE / 2],
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offsetX.value}, {translateY: offsetY.value}],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
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
