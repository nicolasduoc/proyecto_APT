import { Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Map() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    fetch("https://api.boostr.cl/earthquakes/recent.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setEarthquakes(data.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView className="flex-1 bg-black">
      <Text className="font-bold text-2xl text-white">Map</Text>
      <Text className="text-white">
        Ultimos 15 sismos recientes en Chile en el mapa.
      </Text>
      <MapView
        style={{ flex: 1, height: 500 }}
        initialRegion={{
          latitude: -35.6751, // Central Chile
          // eslint-disable-next-line prettier/prettier
          longitude: -71.5430, // Central Chile
          latitudeDelta: 10, // Increase to show a larger area
          longitudeDelta: 10, // Increase to show a larger area
        }}
      >
        {earthquakes.map((quake, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(quake.latitude),
              longitude: parseFloat(quake.longitude),
            }}
            title={quake.place}
            description={`Magnitude: ${quake.magnitude}, Depth: ${quake.depth}`}
          >
            <Image
              source={require("../../assets/marker.png")}
              style={{ width: 24, height: 24 }}
            />
          </Marker>
        ))}
      </MapView>
    </ScrollView>
  );
}
