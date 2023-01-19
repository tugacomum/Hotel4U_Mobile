import { FONTS, SIZES, assets } from "../consts";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput } from "react-native";
import COLORS from "../consts/colors";

const HomeHeader = ({ onSearch, color }) => {
  return (
    <View
      style={{
        paddingBottom: SIZES.font
      }}
    >
      
      <View style={{ marginTop: SIZES.font, paddingHorizontal: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.light,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,

            elevation: 8,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base, tintColor: COLORS.dark }}
          />
          <TextInput
            placeholder="Search Hotels"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;