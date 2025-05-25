import React from "react";
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");
const itemWidth = width - 55;

export default function SkincareAds() {
  const skincareAdsImages = [
    require("../assets/skincare-ads/cetaphil-ad.png"),
    require("../assets/skincare-ads/belo-ad.png"),
    require("../assets/skincare-ads/celeteque-ad.png"),
    require("../assets/skincare-ads/neutrogena-ad.png"),
  ];

  return (
    <View className="overflow-hidden ml-3 mr-3 mt-7">
      <Carousel
        loop
        autoPlay={true}             // disable autoplay to improve manual swipe responsiveness
        width={itemWidth}
        height={150}
         autoPlayInterval={3000} 
        scrollAnimationDuration={350} // reduce from 5000 to 350ms for snappier swipes
        data={skincareAdsImages}
        snapEnabled={true}
        panGestureHandlerProps={{ activeOffsetX: [-5, 5] }} // slightly tighter gesture threshold for better responsiveness
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={styles.slide}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={item}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden", // clips image inside to rounded corners
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
