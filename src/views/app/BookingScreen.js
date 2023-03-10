import { View, Text, SafeAreaView, Keyboard, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../consts/colors';
import { Divider } from 'react-native-paper';
import DateTimePicker from '../../components/DateTimePicker';
import moment from "moment";
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useAuth } from '../../contexts/auth';

const checked = require('../../assets/check.png')

const today = new Date();

const BookingScreen = ({ route, navigation }) => {
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);
    const shown = Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    const hide = Keyboard.addListener("keyboardWillHide", keyboardWillHide);

    return () => {
      shown.remove();
      hide.remove();
    };
  }, [])
  const { createReservation, user } = useAuth();
  const item = route.params.item;
  const [dateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [dateTimePickerVisible2, setDateTimePickerVisibility2] = useState(false);
  const [dayIn, setDayIn] = useState(today);
  const [dayOut, setDayOut] = useState(today);
  const [state, setState] = useState(false);
  const [kids, setKids] = useState(0);
  const [adults, setAdults] = useState(0);

  const keyboardWillShow = event => {
    const newSize = event.endCoordinates.height - 30;
    setMargin(newSize);
  };

  const keyboardWillHide = () => {
    setMargin(0);
  };

  const hideDatePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateTimePickerVisibility(false);
    setDayIn(date);
  };

  const hideDatePicker2 = () => {
    setDateTimePickerVisibility2(false);
  };

  const handleConfirm2 = (date) => {
    setDateTimePickerVisibility2(false);
    setDayOut(date);
  };

  function callFunction() {
    if (dayIn >= dayOut) {
      showMessage({
        type: "danger",
        message: "Day of departure must be greater than the day of entry",
      });
      return
    }
    if (adults == 0) {
      showMessage({
        type: "danger",
        message: "There must be at least one adult"
      })
    }
    const _idHotel = item._id;
    const _idUser = user._id;

    //verificar count_ppl pelo menos 1
   
    createReservation({
      dayIn, dayOut, state, _idHotel, _idUser, navigation: navigation
    })
    //count_ppl
  }

  function getDayOfWeek(dayIn) {
    const date = moment(dayIn);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.day()];
  }

  function getDayOfWeek2(dayOut) {
    const date = moment(dayOut);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.day()];
  }

  function getDaysDifference(dayIn, dayOut) {
    var date1Ms = dayIn.getTime();
    var date2Ms = dayOut.getTime();

    var difference = date2Ms - date1Ms;

    return Math.round(difference / (1000 * 60 * 60 * 24))
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <FlashMessage />
      <DateTimePicker
        isDatePickerVisible={dateTimePickerVisible}
        setDatePickerVisibility={setDateTimePickerVisibility}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
        dateTime={dayIn}
      />
      <DateTimePicker
        isDatePickerVisible={dateTimePickerVisible2}
        setDatePickerVisibility={setDateTimePickerVisibility2}
        handleConfirm={handleConfirm2}
        hideDatePicker={hideDatePicker2}
        dateTime={dayOut}
      />
      <View style={{ padding: 15, marginLeft: 10, marginRight: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.dark }}>Select a Date</Text>
        <View style={{ flexDirection: 'row', marginTop: 15, height: 120, backgroundColor: '#ededed', borderRadius: 10 }}>
          <TouchableOpacity onPress={() => {
            setDateTimePickerVisibility(true)
          }} style={{ flex: 1, justifyContent: 'center' }}>
            <View>
              <Text style={{ alignSelf: 'center', color: COLORS.grey, fontSize: 14 }}>FROM</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'flex-end' }}>
                <Text style={{ alignSelf: 'center', color: COLORS.dark, fontSize: 24, fontWeight: 'bold' }}>{dayIn.getDate()}</Text><Text style={{ fontWeight: '500', bottom: 4, marginLeft: 2 }}>{moment(dayIn).subtract(0, "month").startOf("month").format('MMM')}</Text>
              </View>
              <Text style={{ alignSelf: 'center', fontSize: 10, color: COLORS.grey }}>{getDayOfWeek(dayIn)}</Text>
            </View>
          </TouchableOpacity>
          <View style={{
            height: '100%',
            width: 1,
            backgroundColor: '#909090'
          }} />
          <TouchableOpacity onPress={() => {
            setDateTimePickerVisibility2(true)
          }} style={{ flex: 1, justifyContent: 'center' }}>
            <View>
              <Text style={{ color: COLORS.grey, fontSize: 14, alignSelf: 'center' }}>TO</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'flex-end' }}>
                <Text style={{ alignSelf: 'center', color: COLORS.dark, fontSize: 24, fontWeight: 'bold' }}>{dayOut.getDate()}</Text><Text style={{ fontWeight: '500', bottom: 4, marginLeft: 2 }}>{moment(dayOut).subtract(0, "month").startOf("month").format('MMM')}</Text>
              </View>
              <Text style={{ alignSelf: 'center', fontSize: 10, color: COLORS.grey }}>{getDayOfWeek2(dayOut)}</Text>
            </View>
          </TouchableOpacity>
          <View style={{
            height: '100%',
            width: 1,
            backgroundColor: '#909090'
          }} />
          <View style={{ flex: 1, justifyContent: 'center', bottom: 7 }}>
            <Text style={{ color: COLORS.grey, fontSize: 14, alignSelf: 'center' }}>TOTAL</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'flex-end' }}>
              <Text style={{ alignSelf: 'center', color: COLORS.dark, fontSize: 24, fontWeight: 'bold' }}>{getDaysDifference(dayIn, dayOut)}</Text><Text style={{ fontWeight: '500', bottom: 4, marginLeft: 2 }}>Night</Text>
            </View>
          </View>
        </View>
      </View>
      <Divider style={{ width: Dimensions.get('screen').width / 1.1, alignSelf: 'center', marginTop: 10 }} />
      <View style={{ padding: 15, marginLeft: 10, marginRight: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Guests</Text>
        <View style={{ flexDirection: 'row', marginTop: 15, height: 100 }}>
          <View style={{ flex: 1, backgroundColor: '#ededed', borderRadius: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ alignSelf: 'center', color: COLORS.grey, fontSize: 14 }}>ADULTS</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                <TouchableOpacity disabled={adults == 0 ? true : false} onPress={() => { setAdults(prevValue => prevValue - 1) }}>
                  <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 20, bottom: 2 }}>-</Text>
                  </View>
                </TouchableOpacity>
                <View style={{}}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', width: 40, textAlign: 'center' }}>{adults}</Text>
                </View>
                <TouchableOpacity onPress={() => { setAdults(prevValue => prevValue + 1) }}>
                  <View style={{ backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, bottom: 2 }}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ width: Dimensions.get('screen').width / 10 }} />
          <View style={{ flex: 1, backgroundColor: '#ededed', borderRadius: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ alignSelf: 'center', color: COLORS.grey, fontSize: 14 }}>KIDS</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                <TouchableOpacity disabled={kids == 0 ? true : false} onPress={() => { setKids(prevValue => prevValue - 1) }}>
                  <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 20, bottom: 2 }}>-</Text>
                  </View>
                </TouchableOpacity>
                <View style={{}}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', width: 40, textAlign: 'center' }}>{kids}</Text>
                </View>
                <TouchableOpacity onPress={() => { setKids(prevValue => prevValue + 1) }}>
                  <View style={{ backgroundColor: COLORS.primary, width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, bottom: 2 }}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Divider style={{ width: Dimensions.get('screen').width / 1.1, alignSelf: 'center', marginTop: 10 }} />
      <View style={{ padding: 15, marginLeft: 10, marginRight: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: 5, fontWeight: 'bold', marginTop: 1, fontSize: 22 }}>Hotel Services</Text>
          <Text style={{ marginLeft: 5, fontWeight: '500', marginTop: 2 }}>(tap to select services)</Text>
        </View>
        {state == true ? (
          <TouchableOpacity onPress={() => setState(!state)}>
            <View style={{ flexDirection: 'row', marginTop: 15, height: 120, backgroundColor: COLORS.primary, borderRadius: 10, borderColor: state == true ? COLORS.primary : null, borderWidth: state == true ? 4 : null, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 50, height: 50 }} source={checked} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setState(!state)}>
            <View style={{ marginTop: 15, height: 120, backgroundColor: '#ededed', borderRadius: 10, borderColor: state == true ? COLORS.primary : null, borderWidth: state == true ? 4 : null }}>
              <View style={{ flex: 1, height: 120, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 5 }}>?? Laundry</Text>
                  <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 5 }}>?? Pub</Text>
                  <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 5 }}>?? WiFi Acess</Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 5 }}>?? Breakfast</Text>
                  <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 5 }}>?? Cofee & Tea</Text>
                  <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 5 }}>?? 24h Recept</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 100 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: COLORS.white }}>Extra payment of {item.services_price}???</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={callFunction} style={{
        padding: 15,
        margin: 20,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        marginTop: 25
      }}>
        <Text style={{
          fontSize: 17,
          fontWeight: 'bold',
          color: 'white',
        }}>Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BookingScreen