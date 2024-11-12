import React from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import {
  HomeIcon,
  InfoIcon,
  Map,
  EarthIcon,
  New,
  History,
} from "../../components/Icons";
import { View, Text } from "react-native";

const TabBarIcon = ({ Icon, color, label }) => (
  <View className="items-center justify-center">
    <Icon color={color} size={24} />
    <Text className="text-xs mt-1" style={{ color }}>
      {label}
    </Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1A1A1A",
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            className="absolute inset-0 rounded-2xl"
          />
        ),
        tabBarActiveTintColor: "#60A5FA",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={HomeIcon} color={color} label="Inicio" />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={Map} color={color} label="Mapa" />
          ),
        }}
      />
      <Tabs.Screen
        name="sismos"
        options={{
          title: "Sismos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={EarthIcon} color={color} label="Sismos" />
          ),
        }}
      />
      <Tabs.Screen
        name="ultimosismo"
        options={{
          title: "Último",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={New} color={color} label="Último" />
          ),
        }}
      />
      <Tabs.Screen
        name="sismoshistorico"
        options={{
          title: "Historico",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={History} color={color} label="Historico" />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Sobre",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={InfoIcon} color={color} label="Sobre" />
          ),
        }}
      />
    </Tabs>
  );
}
