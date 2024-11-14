import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const UltimoSismo = () => {
  const [earthquake, setEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEarthquakeData();
  }, []);

  const fetchEarthquakeData = async () => {
    try {
      const response = await fetch("https://api.boostr.cl/earthquake.json");
      const data = await response.json();
      if (data.status === "success") {
        setEarthquake(data.data);
      } else {
        setError("No se pudo obtener información del sismo");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Error al cargar los datos del sismo");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text style={tw`mt-4 text-lg font-semibold text-gray-300`}>
          Cargando datos del último sismo...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center p-4 bg-gray-900`}>
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text style={tw`mt-4 text-lg font-semibold text-center text-gray-300`}>
          {error}
        </Text>
        <TouchableOpacity
          style={tw`mt-4 bg-blue-600 py-2 px-4 rounded-full`}
          onPress={fetchEarthquakeData}
        >
          <Text style={tw`text-white font-semibold`}>Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const mapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [
        {
          color: "#e8e8e8",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#444444",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#b4d4e1",
        },
        {
          visibility: "on",
        },
      ],
    },
  ];

  return (
    <ScrollView style={tw`flex-1 bg-gray-900`}>
      <View style={tw`bg-gray-800 rounded-lg shadow-lg m-4 p-4`}>
        <Text style={tw`text-2xl font-bold mb-2 text-gray-100`}>
          {earthquake.place}
        </Text>
        <View style={tw`flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-400`}>
            <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />{" "}
            {earthquake.date}
          </Text>
          <Text style={tw`text-gray-400`}>
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />{" "}
            {earthquake.hour}
          </Text>
        </View>
        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-lg text-gray-300`}>
            <Ionicons name="pulse-outline" size={20} color="#60A5FA" />{" "}
            Magnitud: {earthquake.magnitude}
          </Text>
          <Text style={tw`text-lg text-gray-300`}>
            <Ionicons name="arrow-down-outline" size={20} color="#60A5FA" />{" "}
            Profundidad: {earthquake.depth}
          </Text>
        </View>
        <Image
          source={{ uri: earthquake.image }}
          style={tw`w-full h-64 rounded-lg mb-4`}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={tw`bg-blue-600 py-2 px-4 rounded-full self-start`}
          onPress={() => Linking.openURL(earthquake.info)}
        >
          <Text style={tw`text-white font-semibold`}>Más Información</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`bg-gray-800 rounded-lg shadow-lg m-4 p-4`}>
        <Text style={tw`text-xl font-bold mb-2 text-gray-100`}>
          Ubicación del Sismo
        </Text>
        <View style={tw`w-full h-80 rounded-lg overflow-hidden`}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={tw`w-full h-full`}
            initialRegion={{
              latitude: parseFloat(earthquake.latitude),
              longitude: parseFloat(earthquake.longitude),
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
            customMapStyle={mapStyle}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(earthquake.latitude),
                longitude: parseFloat(earthquake.longitude),
              }}
              title={earthquake.place}
              description={`Magnitud: ${earthquake.magnitude}`}
            >
              <View
                style={tw`bg-red-500 p-2 rounded-full border-2 border-white`}
              >
                <Ionicons name="location" size={24} color="white" />
              </View>
            </Marker>
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

export default UltimoSismo;
