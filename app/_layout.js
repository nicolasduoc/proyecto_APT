import { Pressable, View, ActivityIndicator, Image, Text } from "react-native";
import { Stack, Link } from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useRouter, useSegments } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import logo from "../assets/earthalert.jpg";
import { Drawer } from "expo-router/drawer";
import { DrawerContent } from "../components/Drawer";

// Definimos el componente HeaderRight
const HeaderRight = () => {
  const { logout } = useAuth();

  return (
    <View className="flex-row items-center">
      <Link href="/notifications" asChild>
        <Pressable className="mr-4">
          <Ionicons name="notifications-outline" size={24} color="white" />
        </Pressable>
      </Link>
      <Link href="/about" asChild>
        <Pressable className="mr-4">
          <FontAwesome5 name="info-circle" size={24} color="white" />
        </Pressable>
      </Link>
      <Pressable onPress={logout} className="mr-4">
        <Ionicons name="log-out-outline" size={24} color="white" />
      </Pressable>
    </View>
  );
};

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // No hacer nada mientras está cargando

    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup) {
      router.replace("/auth/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segments, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#60A5FA" />
      </View>
    );
  }

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1F2937",
        },
        headerTintColor: "#fff",
        drawerStyle: {
          backgroundColor: "#111827",
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerStyle: {
            backgroundColor: "#1F2937",
          },
          headerTitle: "",
          headerLeft: () => (
            <View className="flex-row items-center">
              <Image
                source={logo}
                borderRadius={25}
                className="w-10 h-10 mr-4"
              />
              <Text className="text-white font-bold text-lg">EarthAlert</Text>
            </View>
          ),
          headerTintColor: "#fff",
          headerRight: () => <HeaderRight />,
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
