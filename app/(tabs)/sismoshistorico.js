import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";

const YEAR_RANGE = Array.from({ length: 2024 - 1900 + 1 }, (_, i) =>
  (2024 - i).toString(),
);

const EarthquakeApp = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [year, setYear] = useState("2023");
  const [magnitude, setMagnitude] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isYearPickerVisible, setYearPickerVisible] = useState(false);

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "No disponible";
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes} UTC`;
  };

  const fetchEarthquakes = useCallback(async () => {
    setLoading(true);
    try {
      const minMagParam = magnitude > 1 ? `&minmagnitude=${magnitude}` : "";
      const response = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${year}-01-01&endtime=${year}-12-31&minlatitude=-56&maxlatitude=-17.5&minlongitude=-75&maxlongitude=-68${minMagParam}&limit=1000`,
      );
      const data = await response.json();
      setEarthquakes(data.features || []);
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
      setEarthquakes([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [year, magnitude]);

  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  const getMagnitudeStyle = (mag) => {
    if (mag < 4.0) return { color: "#10B981", icon: "leaf" };
    if (mag >= 4.0 && mag <= 6.0)
      return { color: "#F59E0B", icon: "exclamation-triangle" };
    if (mag > 6.0) return { color: "#EF4444", icon: "skull" };
    return { color: "#6B7280", icon: "question-circle" };
  };

  const renderEarthquakeItem = ({ item }) => {
    const { color, icon } = getMagnitudeStyle(item.properties.mag);
    return (
      <View className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg border border-gray-700">
        <Text className="text-lg font-bold mb-2 text-gray-100">
          {item.properties.place || "Ubicación desconocida"}
        </Text>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-gray-400">
            <FontAwesome5 name="calendar-alt" size={14} color="#9CA3AF" />{" "}
            {formatDateTime(item.properties.time)}
          </Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: color }}
          >
            <Text className="text-white font-bold text-sm">
              <FontAwesome5 name={icon} size={14} color="#FFFFFF" />{" "}
              {item.properties.mag !== null
                ? item.properties.mag.toFixed(1)
                : "N/A"}
            </Text>
          </View>
        </View>
        <Text className="text-sm text-gray-400">
          <FontAwesome5 name="arrow-down" size={14} color="#9CA3AF" />{" "}
          Profundidad: {item.geometry.coordinates[2]?.toFixed(2) || "N/A"} km
        </Text>
        <Text className="text-sm text-gray-400">
          Lat: {item.geometry.coordinates[1]?.toFixed(2) || "N/A"} | Lon:{" "}
          {item.geometry.coordinates[0]?.toFixed(2) || "N/A"}
        </Text>
      </View>
    );
  };

  const YearPicker = () => (
    <Modal
      visible={isYearPickerVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setYearPickerVisible(false)}
    >
      <View className="flex-1 justify-end bg-black bg-opacity-50">
        <View className="bg-gray-800 rounded-t-3xl p-4 h-1/2">
          <Text className="text-white text-xl font-bold mb-4 text-center">
            Seleccionar Año
          </Text>
          <ScrollView>
            {YEAR_RANGE.map((y) => (
              <TouchableOpacity
                key={y}
                className={`py-3 px-4 border-b border-gray-700 ${
                  y === year ? "bg-blue-600" : ""
                }`}
                onPress={() => {
                  setYear(y);
                  setYearPickerVisible(false);
                }}
              >
                <Text className="text-white text-lg text-center">{y}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <Text className="text-3xl font-bold mb-6 text-center text-gray-100">
        Terremotos Históricos
      </Text>

      <View className="mb-6 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
        <Text className="text-lg font-semibold mb-4 text-gray-100">
          Filtros
        </Text>
        <View className="mb-4">
          <Text className="text-sm mb-2 text-gray-300">Año: {year}</Text>
          <TouchableOpacity
            className="bg-gray-700 p-3 rounded-md"
            onPress={() => setYearPickerVisible(true)}
          >
            <Text className="text-white text-center">{year}</Text>
          </TouchableOpacity>
        </View>
        <View className="mb-2">
          <Text className="text-sm mb-2 text-gray-300">
            Magnitud mínima: {magnitude.toFixed(1)}
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={9}
            step={0.1}
            value={magnitude}
            onValueChange={setMagnitude}
            minimumTrackTintColor="#3B82F6"
            maximumTrackTintColor="#4B5563"
            thumbTintColor="#60A5FA"
            className="w-full h-10"
          />
        </View>
      </View>

      <TouchableOpacity
        className="bg-blue-600 py-2 px-4 rounded-full self-center mb-4"
        onPress={fetchEarthquakes}
      >
        <Text className="text-white font-semibold">Buscar Terremotos</Text>
      </TouchableOpacity>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text className="mt-4 text-gray-300">Cargando terremotos...</Text>
        </View>
      ) : (
        <FlatList
          data={earthquakes}
          keyExtractor={(item, index) => `${item.id || index}-${index}`}
          renderItem={renderEarthquakeItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#60A5FA"
            />
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-10">
              <FontAwesome5 name="search" size={50} color="#4B5563" />
              <Text className="text-center text-gray-400 mt-4 text-lg">
                No se encontraron terremotos para los filtros seleccionados.
              </Text>
            </View>
          }
        />
      )}
      <YearPicker />
    </View>
  );
};

export default EarthquakeApp;
