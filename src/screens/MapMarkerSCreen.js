import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { useState } from "react"


const MapMarkerSCreen = () => {
    const [ pin, setPin ] = useState({latitude: 37.78825,longitude: -122.4324})
	const [ region, setRegion ] = useState({latitude: 37.78825,longitude: -122.4324,latitudeDelta: 0.0922,longitudeDelta: 0.0421})

    
  return (
    <View style={{ marginTop: 50, flex: 1 }}>
   
    <MapView
        style={styles.map}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }}
       // provider="google"
    >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        <Marker
            coordinate={pin}
            pinColor='#1145FD'
            draggable={true}
            onDragStart={(e) => {
                console.log("Drag start", e.nativeEvent.coordinates)
            }}
            onDragEnd={(e) => {
                setPin({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                })
            }}
        >
           
        </Marker>
        <Circle center={pin} radius={1000} />
    </MapView>
</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})
export default MapMarkerSCreen