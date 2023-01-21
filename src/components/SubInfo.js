import React from "react";
import { View, Text } from "react-native";
import { Rating } from 'react-native-stock-star-rating';
import COLORS from "../consts/colors";
import { SIZES, FONTS, SHADOWS } from "../consts";

export const NFTTitle = ({ title, subTitle, titleSize, subTitleSize, rating_avg }) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: titleSize,
            color: COLORS.dark,
          }}
        >
          Hotel {title}
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: titleSize,
            color: COLORS.dark,
            marginTop: 5
          }}>
        </Text>
        <View style={{top: 1}}>
        <Rating color={COLORS.orange} stars={rating_avg} maxStars={5} size={15} /></View>
      </View>
      <Text
        style={{
          fontSize: subTitleSize,
          color: COLORS.grey,
          marginTop: 20
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export const EndDate = ({ item }) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",
      }}
    >
      <Text
        style={{
          fontWeight: '500',
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {item.price}€
      </Text>
    </View>
  );
};

export const SubInfo = ({ item }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <EndDate item={item} />
    </View>
  );
};