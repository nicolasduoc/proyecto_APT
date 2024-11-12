import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, ImageBackground } from "react-native";
import icon from "../assets/earthalert.jpg";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../global.css";

export function Main() {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
      }}
      className="flex-1"
    >
      <View className="flex-1 bg-black/50 items-center justify-center p-6">
        <StatusBar style="light" />

        <View className="items-center mb-8">
          <Text className="text-4xl font-extrabold text-white bg-red-600 px-4 py-2 rounded-lg mb-4">
            EARTH ALERT
          </Text>
          <Text className="text-2xl font-bold text-white bg-red-600 px-3 py-1 rounded-md mb-2">
            ¡Alerta de Terremotos!
          </Text>
          <Text className="text-2xl font-bold text-white bg-red-600 px-3 py-1 rounded-md">
            ¡Alerta de Tsunamis!
          </Text>
        </View>

        <Image source={icon} className="w-56 h-56 rounded-full mb-8" />

        <Text className="text-white text-lg font-semibold text-center mb-8">
          ¡Alerta a tus seres queridos, todo en una sola app!
        </Text>

        <TouchableOpacity
          className="bg-blue-600 rounded-full py-4 px-8 mb-12"
          onPress={() => alert("Iniciando...")}
        >
          <Text className="text-white text-xl font-bold">Iniciar!</Text>
        </TouchableOpacity>

        <View className="flex-row justify-around w-full">
          <TouchableOpacity
            className="items-center"
            onPress={() => alert("Abriendo mapa...")}
          >
            <Ionicons name="map-outline" size={32} color="white" />
            <Text className="text-white mt-2">Mapa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center"
            onPress={() => alert("Abriendo configuración...")}
          >
            <Ionicons name="settings-outline" size={32} color="white" />
            <Text className="text-white mt-2">Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center"
            onPress={() => alert("Abriendo información...")}
          >
            <Ionicons
              name="information-circle-outline"
              size={32}
              color="white"
            />
            <Text className="text-white mt-2">Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
