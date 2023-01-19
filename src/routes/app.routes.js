import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar, View, Text } from 'react-native';

import Home from '../views/app/HomeScreen';
import Details from '../views/app/DetailsScreen';
import User from '../views/app/UserScreen';
import Favourite from '../views/app/FavouriteScreen'
import EditUser from '../views/app/EditUserScreen'
import COLORS from '../consts/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HotelTabBar from './HotelTabBar';
import HotelsScreen from '../views/app/HotelsScreen';

const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppRoutes() {

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <Tab.Navigator initialRouteName='HomeScreen' tabBar={props => <HotelTabBar {...props} />}>
        <Tab.Screen name="HomeScreen" component={HomeStackScreen}  />
        <Tab.Screen name="ProfileScreen" component={ProfileStackScreen} options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="FavouriteScreen" component={Favourite} />
        <Tab.Screen name="DetailsScreen" component={Details} />
      </Tab.Navigator>
    </>
  )
}
const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={User} options={{
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <MaterialCommunityIcons.Button
              name="account-edit"
              size={25}
              backgroundColor={COLORS.white}
              color={COLORS.dark}
              onPress={() => navigation.navigate('EditProfileScreen')}
            />
          </View>
        ),
      }} />
      <ProfileStack.Screen name="EditProfileScreen" options={{
        headerTitle: 'Edit your profile'
      }} component={EditUser} />
    </ProfileStack.Navigator>
  )
}
const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <HomeStack.Screen name="HotelsScreen" options={{headerTitle: () => (
        <View>
          <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.dark }}>
              Here's all the <Text
                style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary }}>
                Hotels
              </Text>
            </Text>
          </View>
        </View>
      )}} component={HotelsScreen} />
      <HomeStack.Screen name="DetailsScreen" component={Details} options={{headerTitle: () => (
        <View>
          <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary }}>
              Hotel's <Text
                style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.dark }}>
                details
              </Text>
            </Text>
          </View>
        </View>
      )}}/>
    </HomeStack.Navigator>
  )
}