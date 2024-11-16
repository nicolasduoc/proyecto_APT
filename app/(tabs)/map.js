import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const lightMapStyle = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#b3d4fc" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#c5e8c5" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#8b4513" }, { weight: 1 }],
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
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#a0d6a0" }],
  },
];

export default function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEarthquakes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.xor.cl/sismo/recent");
      const data = await response.json();
      if (data.status_code === 0) {
        setEarthquakes(data.events);
        setError(null);
      } else {
        setError("No se pudieron obtener los datos de sismos recientes");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Error al cargar los datos de sismos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  const getMagnitudeColor = (magnitude) => {
    if (magnitude < 4.0) return "#4ade80";
    if (magnitude < 6.0) return "#fbbf24";
    return "#ef4444";
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text className="mt-4 text-white">Cargando mapa de sismos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-white mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-full"
          onPress={fetchEarthquakes}
        >
          <Text className="text-white">Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-2 text-white">
          Mapa de Sismos Recientes
        </Text>
        <Text className="mb-2 text-gray-300 text-sm">
          Últimos 15 sismos registrados en Chile
        </Text>
      </View>
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          customMapStyle={lightMapStyle}
          initialRegion={{
            latitude: -33.4489,
            longitude: -70.6693,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          {earthquakes.map((quake, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: quake.latitude,
                longitude: quake.longitude,
              }}
              title={`Magnitud: ${quake.magnitude.value}`}
              description={quake.geo_reference}
            >
              <View
                style={{
                  backgroundColor: getMagnitudeColor(quake.magnitude.value),
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                >
                  {quake.magnitude.value.toFixed(1)}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
      <View className="bg-gray-800 p-2 rounded-t-lg">
        <Text className="font-bold text-white mb-1 text-sm">Leyenda:</Text>
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Ionicons name="ellipse" size={10} color="#4ade80" />
            <Text className="ml-1 text-gray-300 text-xs">Leve (&lt;4.0)</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="ellipse" size={10} color="#fbbf24" />
            <Text className="ml-1 text-gray-300 text-xs">
              Moderado (4.0-5.9)
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="ellipse" size={10} color="#ef4444" />
            <Text className="ml-1 text-gray-300 text-xs">Fuerte (≥6.0)</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
