import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import config from '../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

export default function MapsScreen() {
  const mapEl=useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null)
  useEffect(() => {
    (async function () {
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421
        })
      } else {
        throw new Error('Location permission not granted');
      }
    })();
  }, []);
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <View style={{
        height: '60%'
      }}>
        <MapView
          style={{ height: '60%' }}
          initialRegion={origin}
          showsUserLocation={true}
          zoomEnabled={false}
          loadingEnabled={true}
          ref={mapEl}
          >
          {destination &&
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={config.googleApi}
              strokeWidth={3}
              onReady={result => {
                setDistance(result.distance)
                mapEl.current.fitToCoordinates(
                  result.coordinates, {
                    edgePadding: {
                      top: 50,
                      bottom: 50,
                      left: 50,
                      right: 50
                    }
                  }
                )
              }}
            />
          }
        </MapView>
        <View style={{
          height: '100%'
        }}>
          <GooglePlacesAutocomplete
            placeholder='Where are we going?'
            onPress={(data, details = null) => {
              setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421
              })
            }}
            query={{
              key: config.googleApi,
              language: 'en',
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={{
              listView: {
                height: 100
              }
            }}
          />
          <View>
            {distance &&
              <Text>Distance: {distance}m</Text>
            }
          </View>
        </View>
      </View>

    </View>
  );
}