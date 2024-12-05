import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export function DrawerContent() {
  const router = useRouter();

  const menuItems = [
    {
      title: "Sismos Históricos",
      icon: "time-outline",
      route: "/sismoshistorico",
    },
    {
      title: "Contactos",
      icon: "people-outline",
      route: "/contactos",
    },
    {
      title: "Sobre la App",
      icon: "information-circle-outline",
      route: "/about",
    },
  ];

  return (
    <View className="flex-1 bg-gray-900 pt-10">
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center px-6 py-4 border-b border-gray-800"
            onPress={() => router.push(item.route)}
          >
            <Ionicons name={item.icon} size={24} color="#60A5FA" />
            <Text className="text-white text-lg ml-4">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
