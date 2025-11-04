import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSharedValue, withSpring, createAnimatedComponent } from "react-native-reanimated";

const AnimatedView = createAnimatedComponent(View);

export type CarouselProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  containerStyle?: ViewStyle;
  orientation?: "horizontal" | "vertical";
  itemWidth?: number;
  itemHeight?: number;
  onSnapItem?: (index: number) => void;
  defaultIndex?: number;
  withPagination?: boolean;
  paginationStyle?: ViewStyle;
  paginationDotStyle?: ViewStyle;
  activePaginationDotStyle?: ViewStyle;
};

export const Carousel = <T,>({
  data,
  renderItem,
  containerStyle,
  orientation = "horizontal",
  itemWidth,
  itemHeight,
  onSnapItem,
  defaultIndex = 0,
  withPagination,
  paginationStyle,
  paginationDotStyle,
  activePaginationDotStyle,
}: CarouselProps<T>) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [snapIndex, setSnapIndex] = useState(defaultIndex);

  useEffect(() => {
    if (data.length > 0 && defaultIndex) {
      scrollViewRef.current?.scrollTo({
        x:
          orientation === "horizontal"
            ? (itemWidth ?? Dimensions.get("screen").width) * defaultIndex
            : 0,
        y:
          orientation === "vertical"
            ? (itemHeight ?? Dimensions.get("screen").height) * defaultIndex
            : 0,
        animated: false,
      });
    }
  }, [data.length]);

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        snapToAlignment="start"
        horizontal={orientation === "horizontal"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        snapToInterval={
          orientation === "horizontal"
            ? itemWidth ?? Dimensions.get("screen").width
            : itemHeight ?? Dimensions.get("screen").height
        }
        onScroll={(e: any) => {
          const index =
            orientation === "horizontal"
              ? Math.round(
                  e.nativeEvent.contentOffset.x /
                    (itemWidth ?? Dimensions.get("screen").width)
                )
              : Math.round(
                  e.nativeEvent.contentOffset.y /
                    (itemHeight ?? Dimensions.get("screen").height)
                );
          onSnapItem?.(index);
          setSnapIndex(index);
        }}
      >
        {data.map((item, index) => renderItem(item, index))}
      </ScrollView>

      {withPagination && (
        <CarouselPagination
          length={data.length}
          activeIndex={snapIndex}
          containerStyle={paginationStyle}
          dotStyle={paginationDotStyle}
          activeDotStyle={activePaginationDotStyle}
        />
      )}
    </View>
  );
};

// Pagination Component
type CarouselPaginationProps = {
  length: number;
  activeIndex: number;
  containerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  activeDotStyle?: ViewStyle;
};

const CarouselPagination = ({
  length,
  activeIndex,
  containerStyle,
  dotStyle,
  activeDotStyle,
}: CarouselPaginationProps) => (
  <View style={[styles.paginationContainer, containerStyle]}>
    {Array.from({ length }).map((_, index) => (
      <CarouselPaginationItem
        key={index}
        active={index === activeIndex}
        style={[
          styles.paginationDot,
          dotStyle,
          index === activeIndex && [styles.paginationDotActive, activeDotStyle],
        ] as any}
      />
    ))}
  </View>
);

// Pagination Dot Item
const CarouselPaginationItem = ({
  key,
  active,
  style,
}: {
  key: number;
  active: boolean;
  style?: ViewStyle;
}) => {
  const dotWidth = useSharedValue(active ? 20 : 12.5);

  useEffect(() => {
    dotWidth.value = withSpring(active ? 20 : 12.5, { duration: 400 });
  }, [active]);

  return (
    <AnimatedView
      style={[
        styles.dotBase,
        style,
        {
          width: dotWidth.value,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
  },
  paginationDot: {
    borderRadius: 100,
    height: 6,
  },
  paginationDotActive: {
  },
  dotBase: {
    borderRadius: 100,
    height: 6,
  },
});

export default Carousel;
