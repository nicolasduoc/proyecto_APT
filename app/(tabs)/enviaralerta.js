/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useAuth } from "../context/AuthContext";

// Configurar el comportamiento de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: "max",
    presentation: "banner",
    sound: true,
  }),
});

const EnviarAlerta = () => {
  const { user } = useAuth();
  const [magnitud, setMagnitud] = useState("1");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");

  // Registrar el dispositivo para notificaciones
  const registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("No se obtuvieron permisos de notificación");
        Alert.alert(
          "Error",
          "Se necesitan permisos para recibir notificaciones",
        );
        return;
      }

      // Agregar logs de diagnóstico
      const tokenData = await Notifications.getExpoPushTokenAsync();
      console.log("Token obtenido:", tokenData.data);

      // Verificar el guardado del token
      const response = await fetch(
        "https://vortexcode.cl/api/notificaciones/actualizar-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.userId,
            pushToken: tokenData.data,
          }),
        },
      );

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);

      if (!response.ok) {
        console.error("Error al actualizar token en servidor");
      }
    } catch (error) {
      console.error("Error en registro de notificaciones:", error);
    }
  };

  const actualizarTokenEnServidor = async (token) => {
    try {
      const response = await fetch(
        "https://vortexcode.cl/api/notificaciones/actualizar-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.userId,
            pushToken: token,
          }),
        },
      );

      if (!response.ok) {
        console.error("Error al actualizar token en servidor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getMagnitudeColor = (magnitude) => {
    if (magnitude <= 3) return "bg-green-500";
    if (magnitude <= 6) return "bg-yellow-500";
    if (magnitude <= 9) return "bg-orange-500";
    return "bg-red-500";
  };

  const mercalliScales = [
    {
      value: "1",
      label: "I - Muy débil",
      desc: "No se siente, solo detectado por instrumentos",
    },
    {
      value: "2",
      label: "II - Débil",
      desc: "Sentido por pocas personas en reposo",
    },
    {
      value: "3",
      label: "III - Leve",
      desc: "Sentido por personas en interior de edificios",
    },
    {
      value: "4",
      label: "IV - Moderado",
      desc: "Objetos colgantes oscilan visiblemente",
    },
    {
      value: "5",
      label: "V - Poco fuerte",
      desc: "Se despiertan las personas dormidas",
    },
    {
      value: "6",
      label: "VI - Fuerte",
      desc: "Caminar es difícil, objetos caen",
    },
    {
      value: "7",
      label: "VII - Muy fuerte",
      desc: "Daños en edificios mal construidos",
    },
    {
      value: "8",
      label: "VIII - Destructivo",
      desc: "Daños considerables en estructuras",
    },
    { value: "9", label: "IX - Ruinoso", desc: "Pánico general, daños graves" },
    { value: "10", label: "X - Desastroso", desc: "Destrucción de edificios" },
    {
      value: "11",
      label: "XI - Muy desastroso",
      desc: "Pocas estructuras quedan en pie",
    },
    {
      value: "12",
      label: "XII - Catastrófico",
      desc: "Destrucción total, ondas visibles",
    },
  ];

  const obtenerUbicacion = async () => {
    try {
      setLocationLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Error",
          "Se necesitan permisos de ubicación para enviar alertas",
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
      });

      setLocation(location);
      setLocationLoading(false);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo obtener la ubicación. Por favor, inténtalo de nuevo.",
      );
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    registerForPushNotifications();
    obtenerUbicacion();
    // Configurar el canal de notificaciones para Android
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("earthquake-alerts", {
        name: "Alertas Sísmicas",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "default",
        enableVibrate: true,
        showBadge: true,
        enableLights: true,
      });
    }
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const hora = now.toTimeString().split(" ")[0];
    const fecha = now.toISOString().split("T")[0];
    return { hora, fecha };
  };

  const handleEnviarAlerta = async () => {
    if (!location) {
      Alert.alert("Error", "No se ha podido obtener la ubicación");
      await obtenerUbicacion();
      return;
    }

    setLoading(true);

    try {
      // Obtener fecha y hora actual
      const now = new Date();
      const hora = now.toLocaleTimeString("es-ES");
      const fecha = now.toLocaleDateString("es-ES");

      const alertaData = {
        user_id: user?.userId,
        hora,
        fecha,
        latitud: location.coords.latitude.toFixed(4),
        longitud: location.coords.longitude.toFixed(4),
        magnitud: parseFloat(magnitud),
        push_token: expoPushToken, // Asegúrate de que esto esté definido
      };

      const response = await fetch(
        "https://vortexcode.cl/api/alerta/crear-alerta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alertaData),
        },
      );

      if (response.ok) {
        Alert.alert("Éxito", "Alerta enviada correctamente");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "No se pudo enviar la alerta");
      }
    } catch (error) {
      console.error("Error al enviar alerta:", error);
      Alert.alert("Error", "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (locationLoading) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center">
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text className="text-white mt-4">Obteniendo ubicación...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900 p-6">
      <Text className="text-3xl font-bold text-white mb-8 text-center">
        Enviar Alerta Sísmica
      </Text>

      <View className="bg-gray-800 rounded-lg p-4 mb-6">
        <Text className="text-white text-lg mb-2">
          Intensidad (Escala de Mercalli)
        </Text>
        <View className="border border-gray-700 rounded-lg">
          <Picker
            selectedValue={magnitud}
            onValueChange={setMagnitud}
            dropdownIconColor="white"
            style={{
              color: "white",
              height: 50,
            }}
            dropdownIconRippleColor="gray"
            mode="dropdown"
            theme={{
              mode: "dark",
            }}
            androidPickerMode="dialog"
          >
            {mercalliScales.map((scale) => (
              <Picker.Item
                key={scale.value}
                label={`${scale.label} - ${scale.desc}`}
                value={scale.value}
                style={{
                  backgroundColor: "#1F2937", // bg-gray-800
                  color:
                    scale.value <= 3
                      ? "#4ADE80" // verde para niveles 1-3
                      : scale.value <= 6
                        ? "#EAB308" // amarillo para niveles 4-6
                        : scale.value <= 9
                          ? "#F97316" // naranja para niveles 7-9
                          : "#EF4444", // rojo para niveles 10-12
                }}
              />
            ))}
          </Picker>
        </View>

        {/* Indicador visual de la selección actual */}
        <View
          className={`mt-4 p-3 rounded-lg ${
            parseInt(magnitud) <= 3
              ? "bg-green-500"
              : parseInt(magnitud) <= 6
                ? "bg-yellow-500"
                : parseInt(magnitud) <= 9
                  ? "bg-orange-500"
                  : "bg-red-500"
          }`}
        >
          <Text className="text-white font-semibold">
            {mercalliScales[parseInt(magnitud) - 1].label}
          </Text>
          <Text className="text-white">
            {mercalliScales[parseInt(magnitud) - 1].desc}
          </Text>
        </View>
      </View>

      {location && (
        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <Text className="text-white text-lg mb-2">Ubicación actual:</Text>
          <Text className="text-gray-400">
            Latitud: {location.coords.latitude.toFixed(7)}
          </Text>
          <Text className="text-gray-400">
            Longitud: {location.coords.longitude.toFixed(7)}
          </Text>
        </View>
      )}

      <TouchableOpacity
        className={`p-4 rounded-lg ${loading ? "bg-gray-600" : "bg-red-600"}`}
        onPress={handleEnviarAlerta}
        disabled={loading || !location}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center text-lg font-bold">
            Enviar Alerta
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EnviarAlerta;
