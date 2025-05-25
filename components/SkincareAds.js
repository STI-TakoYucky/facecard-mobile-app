import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window");
const itemWidth = width - 55;
const AUTOPLAY_INTERVAL = 5000; // 5 seconds

export default function SkincareAds() {
  const skincareAdsImages = [
    require("../assets/skincare-ads/cetaphil-ad.png"),
    require("../assets/skincare-ads/belo-ad.png"),
    require("../assets/skincare-ads/celeteque-ad.png"),
    require("../assets/skincare-ads/neutrogena-ad.png"),
  ];

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll to the current index
  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * itemWidth, animated: true });
    }
  };

  // Autoplay logic: advance slide every AUTOPLAY_INTERVAL ms
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= skincareAdsImages.length) {
        nextIndex = 0; // loop back to first slide
      }
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemWidth);
    setCurrentIndex(index);
  };

  return (
    <View className="overflow-hidden ml-3 mr-3 mt-7" style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {skincareAdsImages.map((item, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.imageWrapper}>
              <Image
                source={item}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
  },
  slide: {
    width: itemWidth,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
