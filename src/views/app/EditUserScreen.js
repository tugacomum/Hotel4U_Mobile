import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image
} from 'react-native';

import FlashMessage, { showMessage } from 'react-native-flash-message';

import moment from "moment";

import { calendarIcon } from "../../assets"
import DateTimePicker from "../../components/DateTimePicker"

import { Label, Item, Input } from 'native-base';
import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '../../contexts/auth';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import COLORS from '../../consts/colors';

const EditProfileScreen = ({ navigation }) => {
  
  const hideDatePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    setDateTimePickerVisibility(false);
    setBirthDate(date);
  };

  const [dateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const today = new Date();
  const { user, editUser } = useAuth();
  const [birthDate, setBirthDate] = useState(today);
  const [username, setUsername] = useState(user.username);
  const [adress, setAdress] = useState(user.adress);
  const [phone_number, setPhone_Number] = useState(Number(user.phone_number).toString());
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState('https://www.tv7dias.pt/wp-content/uploads/2018/04/idartigo_10527_tm920x656pxs.jpg');

  function renderInner() {
    return (
      <View style={styles.panel}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={pickCameraImage}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={pickLibraryImage}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  };

  let bs = React.createRef();
  let fall = new Animated.Value(1);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);


  const pickCameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.cancelled) {
      setImage(result.uri);
    }
    if (hasCameraPermission === false) {
      console.log("sem acesso camera")
      return <Text>No acess to Camera</Text>
    }
  }


  const pickLibraryImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.cancelled) {
      setImage(result.uri)
    }
    if (hasGalleryPermission === false) {
      return <Text>No acess to Internal Storage</Text>
    }
  }

  useEffect(() => {
    const galleryStatus = ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(galleryStatus.status === 'granted')
    const cameraStatus = ImagePicker.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted')
    bs.current.snapTo(1)
  }, [image])

  async function editProfile() {
    editUser({
      email, username, birthDate, phone_number: Number(phone_number), adress, navigation: navigation
    })
  }

  return (
    <View style={styles.container}>
      <FlashMessage />
      <DateTimePicker
        isDatePickerVisible={dateTimePickerVisible}
        setDatePickerVisibility={setDateTimePickerVisibility}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
        dateTime={birthDate}
      />
      <BottomSheet
        ref={bs}
        snapPoints={[300, 0]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{
        margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
      }}>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: image,
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 50 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  top: 5,
                  left: 40
                }}>
                <View style={{ backgroundColor: 'black', borderRadius: 20, width: 40, height: 40, alignItems: 'center' }}>
                  <Icon
                    onPress={() => {
                      bs.current.snapTo(0);
                    }}
                    name="camera"
                    size={30}
                    color="#fff"
                    style={{
                      marginTop: 5
                    }}
                  /></View>
              </View>
            </ImageBackground>
          </View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {user.username}
          </Text>
        </View>

        <View style={{ paddingRight: 40, paddingLeft: 40 }}>
          <View style={{ marginTop: 10 }}>
            <Item floatingLabel style={{ borderColor: '#A1A1A1', width: Dimensions.get('window').width / 1.2, alignSelf: 'center', left: 5 }}>
              <Label style={{ top: -8, left: 5, color: '#383838', fontStyle: 'normal', fontSize: 15 }}>Username</Label>
              <Input enablesReturnKeyAutomatically value={username} onChangeText={(text) => setUsername(text)} autoCapitalize='none' autoComplete='off' keyboardType='default' style={{ paddingLeft: 5 }} />
            </Item>
            <Item floatingLabel style={{ borderColor: '#A1A1A1', marginTop: 30, width: Dimensions.get('window').width / 1.2, alignSelf: 'center', left: 5 }}>
              <Label style={{ top: -8, color: '#383838', fontStyle: 'normal', fontSize: 15, left: 4 }}>Email</Label>
              <Input enablesReturnKeyAutomatically value={email} onChangeText={(text) => setEmail(text)} autoCa autoCapitalize='none' autoComplete='off' />
            </Item>
            <Item floatingLabel style={{ borderColor: '#A1A1A1', marginTop: 30, width: Dimensions.get('window').width / 1.2, alignSelf: 'center', left: 5 }}>
              <Label style={{ top: -8, color: '#383838', fontStyle: 'normal', fontSize: 15, left: 4 }}>Adress</Label>
              <Input enablesReturnKeyAutomatically value={adress} onChangeText={(text) => setAdress(text)} autoCa autoCapitalize='none' autoComplete='off' />
            </Item>
            <Item floatingLabel style={{ borderColor: '#A1A1A1', marginTop: 30, width: Dimensions.get('window').width / 1.2, alignSelf: 'center', left: 5 }}>
              <Label style={{ top: -8, color: '#383838', fontStyle: 'normal', fontSize: 15, left: 4 }}>Phone Number</Label>
              <Input enablesReturnKeyAutomatically value={phone_number} onChangeText={(text) => setPhone_Number(text)} autoCa autoCapitalize='none' autoComplete='off' />
            </Item>
          </View>
        </View>
        <View
              style={{
                paddingRight: 40,
                paddingLeft: 23,
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center"
              }}
            >

              <Text style={styles.dob} >{"Date of birth:"}</Text>
              <TouchableOpacity
                style={styles.dobSelector}
                onPress={() => {
                  setDateTimePickerVisibility(true)
                }}
              >

                <Text style={styles.dob} >
                  {birthDate ?
                    moment(birthDate).format("MM-DD-YYYY")
                    :
                    "Choose Date of birth"
                  }
                </Text>

                <Image
                  source={calendarIcon}
                  style={styles.calendarIcon}
                />

              </TouchableOpacity>
            </View>
        <TouchableOpacity style={styles.commandButton} onPress={editProfile}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  commandButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginTop: 40
  },
  dob: {
    fontSize: 14,
  },
  panel: {
    padding: 20,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  dobSelector: {
    marginLeft: 12,
    height: 35,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#979797",
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  calendarIcon: {
    width: 20,
    height: 22,
  },
  header: {
    backgroundColor: COLORS.white,
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.purple,
  },
});