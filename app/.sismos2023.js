import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EarthquakeList = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState("time");
  const [filterMagnitude, setFilterMagnitude] = useState("");

  const fetchEarthquakes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-01-01&endtime=2023-12-31&minlatitude=-56&maxlatitude=-17.5&minlongitude=-75&maxlongitude=-66.5",
      );
      const data = await response.json();
      setEarthquakes(data.features);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError(
        "Error al cargar los datos de sismos. Por favor, intente de nuevo.",
      );
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

  const sortedAndFilteredEarthquakes = earthquakes
    .filter(
      (quake) =>
        filterMagnitude === "" ||
        quake.properties.mag >= parseFloat(filterMagnitude),
    )
    .sort((a, b) => {
      if (sortBy === "time") {
        return b.properties.time - a.properties.time;
      } else if (sortBy === "magnitude") {
        return b.properties.mag - a.properties.mag;
      }
      return 0;
    });

  const renderItem = ({ item }) => (
    <View className="p-4 mb-4 bg-white rounded-lg shadow-lg">
      <View className="flex-row justify-between items-center mb-2">
        <Text
          className={`text-2xl font-bold ${
            item.properties.mag >= 5
              ? "text-red-500"
              : item.properties.mag >= 3
                ? "text-orange-500"
                : "text-green-500"
          }`}
        >
          {item.properties.mag.toFixed(1)}
        </Text>
        <View className="bg-gray-200 rounded-full px-3 py-1">
          <Text className="text-sm text-gray-700">
            {new Date(item.properties.time).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text className="text-lg text-gray-800 mb-1">
        {item.properties.place}
      </Text>
      <Text className="text-base text-gray-600">
        <Ionicons name="time-outline" size={16} color="gray" />{" "}
        {new Date(item.properties.time).toLocaleTimeString()}
      </Text>
      <Text className="text-base text-gray-600">
        <Ionicons name="arrow-down-outline" size={16} color="gray" />{" "}
        Profundidad: {item.geometry.coordinates[2].toFixed(2)} km
      </Text>
    </View>
  );

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Ionicons name="alert-circle-outline" size={64} color="red" />
        <Text className="mt-4 text-lg font-semibold text-center">{error}</Text>
        <TouchableOpacity
          className="mt-4 bg-blue-500 py-2 px-4 rounded-full"
          onPress={fetchEarthquakes}
        >
          <Text className="text-white font-semibold">Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="p-4 bg-white shadow-md">
        <Text className="text-2xl font-bold text-center mb-4">
          Sismos Recientes
        </Text>
        <View className="flex-row justify-between items-center mb-2">
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-full"
            onPress={() => setSortBy(sortBy === "time" ? "magnitude" : "time")}
          >
            <Text className="text-white font-semibold">
              Ordenar por: {sortBy === "time" ? "Fecha" : "Magnitud"}
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Text className="mr-2">Magnitud mínima:</Text>
            <TextInput
              className="border border-gray-300 rounded-md px-2 py-1 w-16"
              value={filterMagnitude}
              onChangeText={setFilterMagnitude}
              keyboardType="numeric"
              placeholder="0.0"
            />
          </View>
        </View>
      </View>
      {loading && !refreshing ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-lg font-semibold">
            Cargando sismos recientes...
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedAndFilteredEarthquakes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerClassName="p-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-4">
              <Ionicons
                name="information-circle-outline"
                size={64}
                color="gray"
              />
              <Text className="mt-4 text-lg font-semibold text-center">
                No hay sismos que cumplan con los criterios de búsqueda
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default EarthquakeList;
