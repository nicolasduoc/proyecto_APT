import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, ImageBackground, ScrollView } from "react-native";
import icon from "../assets/earthalert.jpg";
import consejos from "../assets/consejos.jpg";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import "../global.css";
import { useRouter } from "expo-router";

export function Main() {
  const router = useRouter();

  const consejosSeguridad = [
    {
      titulo: "Antes del Terremoto",
      icono: "shield-check",
      consejos: [
        "Prepara un kit de emergencia",
        "Identifica zonas seguras en tu hogar",
        "Mantén un plan familiar de emergencia",
      ],
    },
    {
      titulo: "Durante el Terremoto",
      icono: "alert-octagon",
      consejos: [
        "Mantén la calma",
        "Aléjate de ventanas y objetos que puedan caer",
        "Ubícate en zonas seguras previamente identificadas",
      ],
    },
    {
      titulo: "Después del Terremoto",
      icono: "medical-bag",
      consejos: [
        "Revisa si hay personas heridas",
        "Verifica el estado de las instalaciones",
        "Sigue las instrucciones de las autoridades",
      ],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3",
        }}
        className="h-96"
      >
        <View className="flex-1 bg-black/60 items-center justify-center p-6">
          <StatusBar style="light" />

          <View className="items-center mb-4">
            <Text className="text-4xl font-extrabold text-white bg-red-600 px-4 py-2 rounded-lg mb-4">
              EARTH ALERT
            </Text>
            <Image source={icon} className="w-32 h-32 rounded-full mb-4" />
            <Text className="text-xl font-semibold text-white text-center">
              Tu compañero de seguridad ante desastres naturales
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-white mb-6 text-center">
          Guía de Seguridad Sísmica
        </Text>

        {consejosSeguridad.map((seccion, index) => (
          <View key={index} className="bg-gray-800 rounded-xl p-4 mb-4">
            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons
                name={seccion.icono}
                size={24}
                color="#60A5FA"
              />
              <Text className="text-xl font-bold text-white ml-2">
                {seccion.titulo}
              </Text>
            </View>
            {seccion.consejos.map((consejo, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                <Text className="text-gray-300">{consejo}</Text>
              </View>
            ))}
          </View>
        ))}

        <Image
          source={consejos}
          className="w-full h-64 rounded-xl mb-6"
          resizeMode="contain"
        />

        <TouchableOpacity
          className="bg-blue-600 rounded-full py-4 px-8 mb-6"
          onPress={() => router.push("/sismos")}
        >
          <Text className="text-white text-xl font-bold text-center">
            Comenzar a Protegerte
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-around bg-gray-800 p-4 rounded-xl">
          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/map")}
          >
            <Ionicons name="map" size={28} color="#60A5FA" />
            <Text className="text-white mt-1">Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/enviaralerta")}
          >
            <Ionicons name="alert-circle" size={28} color="#60A5FA" />
            <Text className="text-white mt-1">Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/contactos")}
          >
            <Ionicons name="people" size={28} color="#60A5FA" />
            <Text className="text-white mt-1">Contactos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
