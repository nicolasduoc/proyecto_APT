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
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text className="mt-4 text-lg font-semibold text-gray-300">
          Cargando datos del último sismo...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-gray-900">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text className="mt-4 text-lg font-semibold text-center text-gray-300">
          {error}
        </Text>
        <TouchableOpacity
          className="mt-4 bg-blue-600 py-2 px-4 rounded-full"
          onPress={fetchEarthquakeData}
        >
          <Text className="text-white font-semibold">Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [{ color: "#8b4513" }, { weight: 1.5 }],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [{ color: "#8b4513" }, { weight: 1 }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d3d3d" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#c5e8c5" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#a0d6a0" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#7fbf7f" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#dadada" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#b3d4fc" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="bg-gray-800 rounded-lg shadow-lg m-4 p-4">
        <Text className="text-2xl font-bold mb-2 text-gray-100">
          {earthquake.place}
        </Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-400">
            <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />{" "}
            {earthquake.date}
          </Text>
          <Text className="text-gray-400">
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />{" "}
            {earthquake.hour}
          </Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg text-gray-300">
            <Ionicons name="pulse-outline" size={20} color="#60A5FA" />{" "}
            Magnitud: {earthquake.magnitude}
          </Text>
          <Text className="text-lg text-gray-300">
            <Ionicons name="arrow-down-outline" size={20} color="#60A5FA" />{" "}
            Profundidad: {earthquake.depth}
          </Text>
        </View>
        <Image
          source={{ uri: earthquake.image }}
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
        <TouchableOpacity
          className="bg-blue-600 py-2 px-4 rounded-full self-start"
          onPress={() => Linking.openURL(earthquake.info)}
        >
          <Text className="text-white font-semibold">Más Información</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-gray-800 rounded-lg shadow-lg m-4 p-4">
        <Text className="text-xl font-bold mb-2 text-gray-100">
          Ubicación del Sismo
        </Text>
        <View className="w-full h-80 rounded-lg overflow-hidden">
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
              <View className="bg-red-500 p-2 rounded-full border-2 border-white">
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
