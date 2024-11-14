import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

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

export default function Map() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const fetchEarthquakes = async () => {
    try {
      const response = await fetch(
        "https://api.boostr.cl/earthquakes/recent.json",
      );
      const data = await response.json();
      if (data.status === "success") {
        setEarthquakes(data.data);
      } else {
        setError("No se pudieron obtener los datos de sismos recientes");
      }
    } catch (error) {
      setError("Error al cargar los datos de sismos");
    } finally {
      setLoading(false);
    }
  };

  const getMagnitudeColor = (magnitude) => {
    if (magnitude < 4.0) return "#4ade80";
    if (magnitude < 6.0) return "#fbbf24";
    return "#ef4444";
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#60a5fa" />
        <Text className="mt-4 text-lg font-semibold text-gray-300">
          Cargando mapa de sismos...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900 p-4">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="mt-4 text-lg font-semibold text-center text-gray-300">
          {error}
        </Text>
        <TouchableOpacity
          className="mt-4 bg-blue-600 py-2 px-4 rounded-full"
          onPress={fetchEarthquakes}
        >
          <Text className="text-white font-semibold">Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="p-4">
        <Text className="font-bold text-3xl text-white mb-2">
          Mapa de Sismos Recientes
        </Text>
        <Text className="text-gray-300 mb-4">
          Este mapa muestra los últimos 15 sismos registrados en Chile. Los
          marcadores están coloreados según la intensidad del sismo: verde para
          leve, amarillo para moderado y rojo para fuerte.
        </Text>
      </View>
      <View className="h-[500px] mx-4 mb-4 rounded-lg overflow-hidden">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: -35.6751,
            longitude: -71.543,
            latitudeDelta: 15,
            longitudeDelta: 15,
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
              description={`Magnitud: ${quake.magnitude}, Profundidad: ${quake.depth}`}
            >
              <View className="bg-white rounded-full p-2 border-2 border-gray-800">
                <Ionicons
                  name="location-sharp"
                  size={15}
                  color={getMagnitudeColor(parseFloat(quake.magnitude))}
                />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
      <View className="px-4 pb-6">
        <Text className="text-white font-semibold mb-2">Leyenda:</Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-sharp" size={24} color="#4ade80" />
          <Text className="text-gray-300 ml-2">
            Sismo leve (Magnitud &lt; 4.0)
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-sharp" size={24} color="#fbbf24" />
          <Text className="text-gray-300 ml-2">
            Sismo moderado (Magnitud 4.0 - 5.9)
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location-sharp" size={24} color="#ef4444" />
          <Text className="text-gray-300 ml-2">
            Sismo fuerte (Magnitud ≥ 6.0)
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
