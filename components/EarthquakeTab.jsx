import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import tw from "twrnc";

const EarthquakeTab = () => {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    fetch("https://api.boostr.cl/earthquakes/recent.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setEarthquakes(data.data);
        }
      })
      .catch((error) =>
        console.error("Error fetching earthquake data:", error)
      );
  }, []);

  const renderItem = ({ item }) => (
    <View style={tw`p-4 border-b border-gray-200`}>
      <Text style={tw`text-lg font-bold`}>{item.place}</Text>
      <Text style={tw`text-sm`}>
        Date: {item.date} {item.hour}
      </Text>
      <Text style={tw`text-sm`}>Magnitude: {item.magnitude}</Text>
      <Text style={tw`text-sm`}>Depth: {item.depth}</Text>
      <Image source={{ uri: item.image }} style={tw`w-full h-40 mt-2`} />
      <TouchableOpacity onPress={() => Linking.openURL(item.info)}>
        <Text style={tw`text-blue-500 mt-2`}>More Info</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={earthquakes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};

export default EarthquakeTab;
