import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const EarthquakeTab = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchEarthquakes = useCallback(async () => {
    try {
      const response = await fetch("https://api.xor.cl/sismo/recent");
      const data = await response.json();
      if (data.status_code === 0) {
        setEarthquakes(data.events);
      } else {
        setError("No se pudieron obtener los datos de sismos recientes");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Error al cargar los datos de sismos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  const getMagnitudeColor = (magnitude) => {
    if (magnitude < 4.0) return "bg-green-500";
    if (magnitude < 6.0) return "bg-yellow-500";
    return "bg-red-500";
  };

  const renderItem = ({ item }) => (
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
      <TouchableOpacity
        style={tw`bg-blue-600 py-2 px-4 rounded-full self-start mt-2`}
        onPress={() => Linking.openURL(item.url)}
      >
        <Text style={tw`text-white font-semibold`}>Más información</Text>
      </TouchableOpacity>
    </View>
  );

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
      data={earthquakes}
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
          <Text style={tw`text-2xl font-bold text-white`}>
            Sismos Recientes
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={tw`flex-1 justify-center items-center py-8`}>
          <Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
          <Text style={tw`text-white mt-4`}>
            No hay sismos recientes para mostrar
          </Text>
        </View>
      }
      contentContainerStyle={tw`pb-4`}
    />
  );
};

export default EarthquakeTab;
