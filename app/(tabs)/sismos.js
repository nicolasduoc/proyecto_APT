import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
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
      const response = await fetch(
        "https://api.boostr.cl/earthquakes/recent.json",
      );
      const data = await response.json();
      if (data.status === "success") {
        setEarthquakes(data.data);
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

  const renderItem = ({ item }) => (
    <View style={tw`bg-white rounded-lg shadow-md m-2 p-4`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-xl font-bold flex-1`}>{item.place}</Text>
        <View style={tw`bg-red-500 rounded-full px-2 py-1`}>
          <Text style={tw`text-white font-bold`}>Mag {item.magnitude}</Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between mb-2`}>
        <Text style={tw`text-gray-600`}>
          <Ionicons name="calendar-outline" size={16} /> {item.date}
        </Text>
        <Text style={tw`text-gray-600`}>
          <Ionicons name="time-outline" size={16} /> {item.hour}
        </Text>
      </View>
      <Text style={tw`text-gray-700 mb-2`}>
        <Ionicons name="arrow-down-outline" size={16} /> Profundidad:{" "}
        {item.depth}
      </Text>
      <Image
        source={{ uri: item.image }}
        style={tw`w-full h-48 rounded-lg mb-2`}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={tw`bg-blue-500 py-2 px-4 rounded-full self-start mt-2`}
        onPress={() => Linking.openURL(item.info)}
      >
        <Text style={tw`text-white font-semibold`}>Más información</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-4 text-lg font-semibold`}>
          Cargando sismos recientes...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center p-4`}>
        <Ionicons name="alert-circle-outline" size={64} color="red" />
        <Text style={tw`mt-4 text-lg font-semibold text-center`}>{error}</Text>
        <TouchableOpacity
          style={tw`mt-4 bg-blue-500 py-2 px-4 rounded-full`}
          onPress={fetchEarthquakes}
        >
          <Text style={tw`text-white font-semibold`}>Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={earthquakes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <Text style={tw`text-2xl font-bold text-center my-4`}>
          Sismos Recientes
        </Text>
      }
      ListEmptyComponent={
        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Ionicons name="information-circle-outline" size={64} color="gray" />
          <Text style={tw`mt-4 text-lg font-semibold text-center`}>
            No hay sismos recientes para mostrar
          </Text>
        </View>
      }
      contentContainerStyle={tw`pb-4`}
    />
  );
};

export default EarthquakeTab;
