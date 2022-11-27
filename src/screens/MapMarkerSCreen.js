import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Dimensions,Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { borderRadius } from '@mui/system';
import { TouchableOpacity } from 'react-native-gesture-handler';
const GOOGLE_PLACES_API_KEY = ''; // never save your real api key in a snack!
var screenWidth = Dimensions.get('window').width;

const MapMarkerSCreen = () => {
    const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });

  const onPress = (data, details) => {
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
  };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: regionCoords.lat,
            longitude: regionCoords.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker 
          coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          pinColor='#1145FD'
          
          />
        </MapView>
       <View style={[{backgroundColor:'white'}, {marginTop:700},{borderRadius:10}]}>
        <GooglePlacesAutocomplete
          styles={styles.searchbar}
         
          placeholder="Search"
          query={{
            key: "AIzaSyCVlxhUjdMWqXtEpJhRImNEB9WAnp0uIWY",
            language: 'en', // language of the results
          }}
          GooglePlacesDetailsQuery={{
            fields: 'geometry',
          }}
          fetchDetails={true}
          onPress={onPress}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url:
              'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            useOnPlatform: 'web',
          }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        />
          <TouchableOpacity
        //onPress={signInWithAWS}
        style = {styles.button}
            >
            <Text style={styles.buttonText}>
              Confirm
            </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    map: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
    },
    searchbar: {
      description: {
        fontWeight: 'bold',
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
      textInputContainer: {
       // backgroundColor: 'blue',
        top: 35,
        width: screenWidth - 10,
        borderWidth: 0,
      },
      textInput: {
        marginLeft: 30,
        marginRight: 40,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 0,
       // marginTop:750,
        borderRadius:5,
        backgroundColor: '#EAEAEA',
        color:'black',
        
      },
      listView: {
        //backgroundColor: 'rgba(192,192,192,0.9)',
        top: 40,
        marginBottom:10
      },
    },
    button:{
        backgroundColor: '#1145FD',
        width: 350,
        height: 42,
        //padding: 15,
        borderRadius: 5,
        //marginTop: -10,
        alignItems: 'center',
        marginRight: 10,
        marginLeft:25,
        marginBottom:50
    },
    
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 13,
        alignSelf:'center',
        marginTop:10
        
    },
  });
export default MapMarkerSCreen