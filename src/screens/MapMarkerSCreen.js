import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Dimensions,TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
const GOOGLE_PLACES_API_KEY = ''; 
var screenWidth = Dimensions.get('window').width;
import { Ionicons } from '@expo/vector-icons';

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
          <Marker coordinate={{ latitude: marker.lat, longitude: marker.lng }} />
        </MapView>
  
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
         <View style={[{backgroundColor:'white'}, {marginTop:10},{borderRadius:10}]}>
         <TouchableOpacity style={styles.passwordContainer}>
            <Input
            //style={{borderBottomWidth:0}}
            autoCorrect={false}
            inputContainerStyle={{borderBottomWidth:0}}
            textAlign= 'left' 
            placeholder="Location will appear here once selected"
            placeholderTextColor={'#000'}
            underlineColorAndroid={'transparent'}
            borderWidth={0}
            leftIcon={
                <Ionicons
                 name="md-location-outline" 
                  size={24}
                  color='black'
                />
            }
            //value={displayCurrentAddress}
            //onPressIn={GetCurrentLocation}
        // onChangeText={this.onPasswordEntry}
        // <Ionicons
        // name="md-location-outline" 
        // color='#000'
        // size={36}
        // style={[{marginTop:5},{marginLeft:-5}]}
        // />
            />
           
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>navigation.navigate("AgeGenderLocationScreen")}
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
        backgroundColor: 'rgba(0,0,0,0)',
        top: 50,
        width: screenWidth - 10,
        borderWidth: 0,
      },
      textInput: {
        //marginLeft: 5,
        //marginRight: 5,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 0,
        marginTop:20
      },
      listView: {
        //backgroundColor: 'rgba(192,192,192,0.9)',
        top: 48,
        //marginLeft:5,
        //marginRight:14
      },
    },
    button:{
        backgroundColor: '#1145FD',
        width: 380,
        height: 42,
        //padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
        marginRight: 10,
        marginLeft:25,
        marginRight:25,
        marginBottom:100
    },
    
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 13,
        alignSelf:'center',
        marginTop:10
        
    },
    input:{
        backgroundColor: '#EAEAEA',
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:5,
        width:296,
        height:32,
        marginTop:10,
        fontSize: 13,
        marginRight:15,
        marginLeft:10,
    // fontStyle:"Montserrat-Regular",
        color:'#535353',
        fontWeight:'400',
      
    },
    passwordContainer: {
        flexDirection: 'row',
        width:380,
        height:50,
        //borderWidth: 1,
       borderColor: '#000',
        marginTop:30,
        marginLeft:25,
        marginRight:25,
        //marginBottom:10,
        overflow:'hidden',
        borderRadius:10,
        backgroundColor: '#EAEAEA',
        //borderColor: "red",
        //paddingBottom: -3,
        //paddingLeft:10,
        borderBottomWidth:0
      },

  });
export default MapMarkerSCreen