import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text } from "react-native";

import COLORS from "../consts/colors";
import { SIZES, SHADOWS, assets} from "../consts";

import { SubInfo, NFTTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";

const HotelCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
        marginTop: 25,
        marginHorizontal: 15
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
        }}
      >
        <Image
          source={{uri:data.image}}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />

        <CircleButton imgUrl={assets.heart} right={10} top={10} />
      </View>

      <SubInfo item={data}/>

      <View style={{ width: "100%", padding: SIZES.font }}>
        <NFTTitle
          rating_avg={data.rating_avg}
          title={data.name}
          subTitle={data.description}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("DetailsScreen", {hotel: data} )}
          />
          <Text style={{fontSize: SIZES.font, color: COLORS.grey, marginTop: 6}}>{data.count_reviews} reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default HotelCard;