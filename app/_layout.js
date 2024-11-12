import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Link, Stack } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import logo from "../assets/earthalert.jpg";

const HeaderLeft = () => (
  <View className="flex-row items-center">
    <Image source={logo} className="w-10 h-10 rounded-full mr-2" />
    <Text className="text-white font-bold text-lg">Earth Alert</Text>
  </View>
);

const HeaderRight = () => (
  <View className="flex-row items-center">
    <Link href="/notifications" asChild>
      <Pressable className="mr-4">
        <Ionicons name="notifications-outline" size={24} color="white" />
      </Pressable>
    </Link>
    <Link href="/about" asChild>
      <Pressable>
        <FontAwesome5 name="info-circle" size={24} color="white" />
      </Pressable>
    </Link>
  </View>
);

export default function Layout() {
  return (
    <View className="flex-1 bg-gray-900">
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "white",
          headerShown: true,
          headerTitle: "",
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
          headerBackground: () => (
            <BlurView
              tint="dark"
              intensity={100}
              className="absolute inset-0"
            />
          ),
        }}
      />
    </View>
  );
}
