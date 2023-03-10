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
import BookingScreen from '../views/app/BookingScreen';
import MapsScreen from '../views/app/MapsScreen';
import CreditCardScreen from '../views/app/CreditCardScreen';
import ReservationsScreen from '../views/app/ReservationsScreen';
import SupportScreen from '../views/app/SupportScreen';
import SettingsScreen from '../views/app/SettingsScreen';
import COLORS from '../consts/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PaymentScreen from '../views/app/PaymentScreen';

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
      <ProfileStack.Screen name="SettingsScreen" options={{
        headerTitle: 'Settings'
      }} component={SettingsScreen} />
      <ProfileStack.Screen name="SupportScreen" options={{
        headerTitle: 'Support'
      }} component={SupportScreen} />
      <ProfileStack.Screen name="CreditCardScreen" options={{
        headerTitle: 'Credit Card'
      }} component={CreditCardScreen} />
      <ProfileStack.Screen name="ReservationsScreen" options={{
        headerTitle: 'Your reservations'
      }} component={ReservationsScreen} />
    </ProfileStack.Navigator>
  )
}
const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator initialRouteName='PaymentScreen'>
      <HomeStack.Screen name="CreditCardScreen" options={{
        headerTitle: 'Credit Card'
      }} component={CreditCardScreen} />
      <HomeStack.Screen name="PaymentScreen" options={{
        headerTitle: 'Payment'
      }} component={PaymentScreen} />
      <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <HomeStack.Screen name="MapsScreen" component={MapsScreen} options={{headerTitle: () => (
        <View>
          <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary }}>
              Maps
            </Text>
          </View>
        </View>
      )}}/>
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
      <HomeStack.Screen name="BookingScreen" component={BookingScreen} options={{
        headerTitle: 'Booking'
      }}/>
    </HomeStack.Navigator>
  )
}