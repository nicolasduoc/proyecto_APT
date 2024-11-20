/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const ContactosEmergencia = () => {
  const { user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("+569");
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(null);

  const obtenerContactos = async () => {
    try {
      console.log("Obteniendo contactos para usuario:", user?.userId);
      const response = await fetch(
        `https://vortexcode.cl/contactos/obtener-contactos/${user?.userId}`,
      );
      const data = await response.json();
      console.log("Contactos obtenidos:", data);

      if (response.ok) {
        console.log("Estableciendo contactos:", data.contactos);
        setContactos(data.contactos);
      } else {
        console.log("Error al obtener contactos:", data);
        Alert.alert("Error", "No se pudieron obtener los contactos");
      }
    } catch (error) {
      console.log("Error al cargar contactos:", error);
      Alert.alert("Error", "Error al cargar los contactos");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      obtenerContactos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  const validarNumero = (numero) => {
    const numeroLimpio = numero.replace(/\D/g, "");
    return numeroLimpio.length === 11;
  };

  const handleNumeroChange = (texto) => {
    if (!texto.startsWith("+569")) {
      texto = "+569";
    }

    if (texto.length <= 12) {
      setNumero(texto);
    }
  };

  const agregarContacto = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "Por favor ingrese un nombre");
      return;
    }

    if (!validarNumero(numero)) {
      Alert.alert("Error", "El número debe tener 8 dígitos después de +569");
      return;
    }

    setLoading(true);
    try {
      const contactoData = {
        id_user: String(user?.userId),
        nombre: String(nombre.trim()),
        numero: String(numero.replace(/\D/g, "")),
      };

      const response = await fetch(
        "https://vortexcode.cl/contactos/crear-contacto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactoData),
        },
      );

      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.log("Error al parsear respuesta:", e);
      }

      if (response.ok || responseText.includes("success")) {
        Alert.alert("Éxito", "Contacto agregado correctamente");
        setNombre("");
        setNumero("");

        // Forzar actualización inmediata de la lista
        setRefreshing(true);
        await obtenerContactos();
        setRefreshing(false);
      } else {
        Alert.alert(
          "Error",
          `No se pudo agregar el contacto: ${data?.error || responseText}`,
        );
      }
    } catch (error) {
      console.log("Error completo:", error);
      Alert.alert("Error", "Error al agregar el contacto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarContacto = async (id_contacto) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este contacto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `https://vortexcode.cl/contactos/eliminar-contacto/${id_contacto}`,
                {
                  method: "DELETE",
                },
              );

              if (response.ok) {
                Alert.alert("Éxito", "Contacto eliminado correctamente");
                obtenerContactos();
              } else {
                Alert.alert("Error", "No se pudo eliminar el contacto");
              }
            } catch (error) {
              Alert.alert("Error", "Error al eliminar el contacto");
            }
          },
        },
      ],
    );
  };

  const handleCall = async (numero) => {
    try {
      const numeroLimpio = numero.replace(/\D/g, "");
      const url = `tel:${numeroLimpio}`;
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Error",
          "No se puede realizar la llamada en este dispositivo",
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar la llamada");
    }
  };

  const handleWhatsApp = async (numero, nombre) => {
    try {
      setLoadingWhatsApp(numero);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Error", "Se necesita permiso para acceder a la ubicación");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      const numeroLimpio = numero.replace(/\D/g, "").replace(/^569/, "");

      const mensaje = encodeURIComponent(
        `¡Hola ${nombre}! 🚨 Estoy experimentando un sismo en mi ubicación actual.\n\n` +
          `Mi ubicación aproximada es:\n` +
          `📍 Latitud: ${latitude.toFixed(6)}\n` +
          `📍 Longitud: ${longitude.toFixed(6)}\n\n` +
          `Puedes ver mi ubicación aquí:\n${mapsUrl}\n\n` +
          `Por favor, mantente en contacto conmigo.`,
      );

      const url = `whatsapp://send?phone=569${numeroLimpio}&text=${mensaje}`;

      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Error",
          "No se puede abrir WhatsApp. Asegúrate de tener WhatsApp instalado.",
        );
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la ubicación o abrir WhatsApp");
      console.error("Error:", error);
    } finally {
      setLoadingWhatsApp(null);
    }
  };

  const renderContacto = ({ item }) => (
    <View className="bg-gray-800 p-4 mb-4 rounded-lg">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg font-bold">{item.nombre}</Text>
          <Text className="text-gray-400">{item.numero}</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => handleWhatsApp(item.numero, item.nombre)}
            disabled={loadingWhatsApp === item.numero}
            className="bg-green-500 p-2 rounded-full mr-2"
          >
            {loadingWhatsApp === item.numero ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="logo-whatsapp" size={20} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCall(item.numero)}
            className="bg-blue-600 p-2 rounded-full mr-2"
          >
            <Ionicons name="call-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => eliminarContacto(item.id_contacto)}
            className="bg-red-600 p-2 rounded-full"
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  console.log("ID de usuario actual:", user?.userId);

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <Text className="text-2xl font-bold text-white mb-6">
        Contactos de Emergencia
      </Text>

      <View className="bg-gray-800 p-4 rounded-lg mb-6">
        <TextInput
          className="bg-gray-700 text-white p-3 rounded-lg mb-3"
          placeholder="Nombre del contacto"
          placeholderTextColor="#9CA3AF"
          value={nombre}
          onChangeText={setNombre}
        />
        <View className="mb-3">
          <TextInput
            className="bg-gray-700 text-white p-3 rounded-lg"
            placeholder="+569XXXXXXXX"
            placeholderTextColor="#9CA3AF"
            value={numero}
            onChangeText={handleNumeroChange}
            keyboardType="numeric"
          />
          <Text className="text-gray-400 text-sm mt-1">
            Formato: +569 seguido de 8 dígitos
          </Text>
        </View>
        <TouchableOpacity
          className={`p-3 rounded-lg ${loading ? "bg-gray-600" : "bg-blue-600"}`}
          onPress={agregarContacto}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold">
              Agregar Contacto
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text className="text-white mt-4">Cargando contactos...</Text>
        </View>
      ) : (
        <FlatList
          data={contactos}
          renderItem={renderContacto}
          keyExtractor={(item) => item.id_contacto.toString()}
          refreshing={refreshing}
          onRefresh={obtenerContactos}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-8">
              <Ionicons name="people-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-400 mt-4 text-center">
                No hay contactos de emergencia agregados
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default ContactosEmergencia;
