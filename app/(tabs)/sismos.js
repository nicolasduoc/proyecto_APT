/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";

const EarthquakeTab = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const getCurrentLocation = useCallback(async () => {
    console.log("Intentando obtener ubicación...");
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Estado del permiso:", status);

      if (status !== "granted") {
        console.log("Permiso denegado");
        setError("Se requiere permiso para acceder a la ubicación");
        return;
      }

      console.log("Obteniendo ubicación...");
      const location = await Location.getCurrentPositionAsync({});
      console.log("Ubicación obtenida:", location);

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log("Error al obtener ubicación:", error);
      setError("Error al obtener la ubicación");
    }
  }, []);

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
    } catch (error) {
      setError("Error al cargar los datos de sismos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakes();
    getCurrentLocation();
  }, [fetchEarthquakes, getCurrentLocation]);

  useEffect(() => {
    console.log("Valor actual de sortBy:", sortBy);
  }, [sortBy]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  const getMagnitudeColor = (magnitude) => {
    if (magnitude < 4.0) return "bg-green-500";
    if (magnitude < 6.0) return "bg-yellow-500";
    return "bg-red-500";
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} metros`;
    }
    return `${distance.toFixed(1)} km`;
  };

  const sortedEarthquakes = useMemo(() => {
    let sorted = [...earthquakes];

    switch (sortBy) {
      case "recent":
        return sorted.sort(
          (a, b) => new Date(b.local_date) - new Date(a.local_date),
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.local_date) - new Date(b.local_date),
        );
      case "magnitude":
        return sorted.sort((a, b) => b.magnitude.value - a.magnitude.value);
      case "nearest":
        if (!currentLocation) return sorted;
        return sorted.sort((a, b) => {
          const distA = calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            a.latitude,
            a.longitude,
          );
          const distB = calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            b.latitude,
            b.longitude,
          );
          return distA - distB;
        });
      case "farthest":
        if (!currentLocation) return sorted;
        return sorted.sort((a, b) => {
          const distA = calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            a.latitude,
            a.longitude,
          );
          const distB = calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            b.latitude,
            b.longitude,
          );
          return distB - distA;
        });
      default:
        return sorted;
    }
  }, [earthquakes, sortBy, currentLocation]);

  const renderItem = ({ item }) => {
    const distance = currentLocation
      ? calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          item.latitude,
          item.longitude,
        )
      : null;

    return (
      <View
        style={tw`bg-gray-800 rounded-lg shadow-md m-2 p-4 border border-gray-700`}
      >
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`text-lg font-bold text-white`}>
            {item.geo_reference}
          </Text>
          <View
            style={tw`${getMagnitudeColor(item.magnitude.value)} px-2 py-1 rounded-full`}
          >
            <Text style={tw`text-white font-bold`}>
              Mag {item.magnitude.value.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={tw`flex-row items-center mb-2`}>
          <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />
          <Text style={tw`text-sm text-gray-400 ml-2`}>{item.local_date}</Text>
        </View>
        <View style={tw`flex-row items-center mb-2`}>
          <Ionicons name="layers-outline" size={16} color="#9CA3AF" />
          <Text style={tw`text-sm text-gray-400 ml-2`}>
            Profundidad: {item.depth} km
          </Text>
        </View>
        {distance && (
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="location-outline" size={16} color="#9CA3AF" />
            <Text style={tw`text-sm text-gray-400 ml-2`}>
              Distancia: {formatDistance(distance)}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={tw`bg-blue-600 py-2 px-4 rounded-full self-start mt-2`}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={tw`text-white font-semibold`}>Más información</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const pickerOptions = useMemo(() => {
    const baseOptions = [
      { label: "Más recientes primero", value: "recent" },
      { label: "Más antiguos primero", value: "oldest" },
      { label: "Por magnitud (mayor a menor)", value: "magnitude" },
    ];

    if (currentLocation) {
      return [
        ...baseOptions,
        { label: "Más cercanos a mi ubicación", value: "nearest" },
        { label: "Más lejanos a mi ubicación", value: "farthest" },
      ];
    }

    return baseOptions;
  }, [currentLocation]);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text style={tw`text-white mt-4`}>Cargando sismos recientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <Text style={tw`text-white mb-4`}>{error}</Text>
        <TouchableOpacity
          style={tw`bg-blue-600 py-2 px-4 rounded-full`}
          onPress={fetchEarthquakes}
        >
          <Text style={tw`text-white font-semibold`}>Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={tw`bg-gray-900`}
      data={sortedEarthquakes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#60A5FA"
        />
      }
      ListHeaderComponent={
        <View style={tw`p-4 bg-gray-800`}>
          <Text style={tw`text-2xl font-bold text-white mb-4`}>
            Sismos Recientes
          </Text>

          <TouchableOpacity
            style={tw`bg-blue-600 p-2 rounded-lg mb-4`}
            onPress={getCurrentLocation}
          >
            <Text style={tw`text-white text-center`}>
              {currentLocation ? "Actualizar Ubicación" : "Obtener Ubicación"}
            </Text>
          </TouchableOpacity>

          <View style={tw`bg-gray-700 rounded-lg mb-4 overflow-hidden`}>
            <Picker
              selectedValue={sortBy}
              onValueChange={setSortBy}
              style={Platform.select({
                ios: [tw`h-12`, { color: "white", backgroundColor: "#374151" }],
                android: [
                  tw`h-12 text-white`,
                  { backgroundColor: "#374151", color: "white" },
                ],
              })}
              dropdownIconColor="white"
              mode="dropdown"
            >
              {pickerOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  style={Platform.select({
                    ios: { color: "white", backgroundColor: "#374151" },
                    android: { color: "white", backgroundColor: "#374151" },
                  })}
                />
              ))}
            </Picker>
          </View>

          <View style={tw`mb-4`}>
            {error && <Text style={tw`text-red-500`}>{error}</Text>}
            {currentLocation ? (
              <Text style={tw`text-green-500`}>
                Ubicación disponible: {currentLocation.latitude.toFixed(4)},{" "}
                {currentLocation.longitude.toFixed(4)}
              </Text>
            ) : (
              <Text style={tw`text-yellow-500`}>
                Activa tu ubicación para ver los sismos más cercanos
              </Text>
            )}
          </View>
        </View>
      }
      ListEmptyComponent={
        <View style={tw`flex-1 justify-center items-center py-8`}>
          <Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
          <Text style={tw`text-white mt-4`}>
            {searchQuery
              ? "No se encontraron sismos que coincidan con la búsqueda"
              : "No hay sismos recientes para mostrar"}
          </Text>
        </View>
      }
      contentContainerStyle={tw`pb-4`}
    />
  );
};

export default EarthquakeTab;
