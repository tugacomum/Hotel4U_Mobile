import { View, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { useAuth } from '../../contexts/auth'
import COLORS from '../../consts/colors';
import { Appearance } from 'react-native';
import { api } from '../../services/api';
import { isIOS } from '../../helper';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Moment from 'moment/moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function User() {
    const [isLoadingDone, setLoadingDone] = useState(false);
    const [data, setData] = useState([]);
    const { user, logout } = useAuth();
    const [color, setColor] = useState('light');
    useEffect(() => {
        Appearance.addChangeListener(({ colorScheme }) => { setColor(colorScheme) });
    })
    async function getData() {
        try {
            const response = await api.get('hotels').then(r => r.data);
            setData(response)
        } catch (err) {
            console.log("Err: " + err)
        } finally {
            setTimeout(() => {
                setLoadingDone(true);
            }, 500);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    if (!isLoadingDone) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Loader size="large" />
            </View>
        )
    } else {

        return (
            <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://www.tv7dias.pt/wp-content/uploads/2018/04/idartigo_10527_tm920x656pxs.jpg',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{user.username}</Title>
            <Caption style={styles.caption}>{Moment(user.birthDate).format('DD-MM-YYYY')}</Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.adress}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.phone_number}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-cog-outline" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={logout}>
          <View style={styles.menuItem}>
            <Icon name="logout" color={COLORS.primary} size={25}/>
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
      alignSelf: 'center'
    },
    infoBox: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 22,
    },
  });