import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appearance } from 'react-native';

const DetailsScreen = ({navigation, route}) => {
  const item = route.params.hotel;
  const [color, setColor] = useState('light');
    useEffect(() => {
      console.log(item)
        Appearance.addChangeListener(({ colorScheme }) => { setColor(colorScheme) });
    })
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: color === 'dark' ? COLORS.darkgrey : COLORS.light,
        flex:1
      }}>
      
      <ImageBackground style={style.headerImage} source={{uri: item.image}}>
        
      </ImageBackground>
      <View>
        <TouchableOpacity style={style.iconContainer} onPress={()=> navigation.navigate("MapsScreen")}>
          <Icon name="place" color={COLORS.white} size={28} />
        </TouchableOpacity>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: color === 'dark' ? COLORS.white : COLORS.dark}}>{item.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.grey,
              marginTop: 5,
              color: color === 'dark' ? COLORS.white : COLORS.dark
            }}>
            {item.location}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} />
              </View>
              <Text style={{bottom:4, fontWeight: 'bold', fontSize: 18, marginLeft: 5, color: color === 'dark' ? COLORS.white : COLORS.dark}}>
                {item.rating_avg}
              </Text>
            </View>
            <Text style={{fontSize: 13, color: COLORS.grey, bottom:1}}>{item.count_reviews} reviews</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{lineHeight: 20, color: COLORS.grey}}>
              {item.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: color === 'dark' ? COLORS.white : COLORS.dark}}>
            Price per night
          </Text>
          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}>
              {item.price}€
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.grey,
                marginLeft: 5,
              }}>
              + breakfast
            </Text>
          </View>
        </View>
        <View style={style.btn}>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
            Book Now
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 300,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
});

export default DetailsScreen;
