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
import MapView, { Marker } from "react-native-maps";
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
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-4 text-lg font-semibold`}>
          Cargando datos del último sismo...
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
          onPress={fetchEarthquakeData}
        >
          <Text style={tw`text-white font-semibold`}>Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`bg-white rounded-lg shadow-md m-4 p-4`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{earthquake.place}</Text>
        <View style={tw`flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-600`}>
            <Ionicons name="calendar-outline" size={16} /> {earthquake.date}
          </Text>
          <Text style={tw`text-gray-600`}>
            <Ionicons name="time-outline" size={16} /> {earthquake.hour}
          </Text>
        </View>
        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-lg`}>
            <Ionicons name="pulse-outline" size={20} /> Magnitud:{" "}
            {earthquake.magnitude}
          </Text>
          <Text style={tw`text-lg`}>
            <Ionicons name="arrow-down-outline" size={20} /> Profundidad:{" "}
            {earthquake.depth}
          </Text>
        </View>
        <Image
          source={{ uri: earthquake.image }}
          style={tw`w-full h-64 rounded-lg mb-4`}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={tw`bg-blue-500 py-2 px-4 rounded-full self-start`}
          onPress={() => Linking.openURL(earthquake.info)}
        >
          <Text style={tw`text-white font-semibold`}>Más Información</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`bg-white rounded-lg shadow-md m-4 p-4`}>
        <Text style={tw`text-xl font-bold mb-2`}>Ubicación del Sismo</Text>
        <View style={tw`w-full h-80 rounded-lg overflow-hidden`}>
          <MapView
            style={tw`w-full h-full`}
            initialRegion={{
              latitude: parseFloat(earthquake.latitude),
              longitude: parseFloat(earthquake.longitude),
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
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
