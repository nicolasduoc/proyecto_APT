import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import logo from "../assets/earthalert.jpg";

const AboutSection = ({ icon, title, content }) => (
  <View className="mb-6 bg-gray-800 rounded-lg p-4">
    <View className="flex-row items-center mb-2">
      {icon}
      <Text className="text-white text-xl font-bold ml-2">{title}</Text>
    </View>
    <Text className="text-gray-300">{content}</Text>
  </View>
);

const About = () => {
  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="items-center justify-center py-8 bg-red-600">
        <Image source={logo} className="w-24 h-24 rounded-full mb-4" />
        <Text className="text-4xl font-bold text-white mb-2">Earth Alert</Text>
        <Text className="text-xl text-white">Alerta Temprana de Sismos</Text>
      </View>

      <View className="p-6">
        <AboutSection
          icon={
            <FontAwesome5
              name="exclamation-triangle"
              size={24}
              color="#FCD34D"
            />
          }
          title="Alerta Temprana"
          content="Earth Alert te proporciona alertas en tiempo real sobre actividad sísmica, permitiéndote estar preparado y actuar rápidamente en caso de emergencia."
        />

        <AboutSection
          icon={
            <MaterialIcons name="family-restroom" size={24} color="#60A5FA" />
          }
          title="Comunicación Rápida"
          content="Facilita la comunicación inmediata con tus seres queridos durante emergencias sísmicas, asegurando que todos estén informados y seguros."
        />

        <AboutSection
          icon={
            <Ionicons name="information-circle" size={24} color="#34D399" />
          }
          title="Información Detallada"
          content="Accede a información actualizada sobre sismos recientes a nivel nacional, incluyendo magnitud, ubicación y profundidad."
        />

        <AboutSection
          icon={<MaterialIcons name="security" size={24} color="#F87171" />}
          title="Consejos de Seguridad"
          content="Encuentra consejos útiles sobre cómo actuar antes, durante y después de un terremoto para mantenerte seguro y preparado."
        />

        <AboutSection
          icon={<Ionicons name="map" size={24} color="#818CF8" />}
          title="Mapa de Actividad Sísmica"
          content="Visualiza la actividad sísmica reciente en un mapa interactivo, permitiéndote entender mejor los patrones y zonas de riesgo."
        />

        <View className="mt-6 mb-10 items-center">
          <Text className="text-gray-400 text-center mb-4">
            Desarrollado con ❤️ usando Expo, React Native y Tailwind CSS. Por
            Nicolas Palma y Miguel Montenegro
          </Text>
          <Link href="/" asChild>
            <Pressable className="bg-blue-600 rounded-full p-4">
              <FontAwesome5 name="home" size={24} color="white" />
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
