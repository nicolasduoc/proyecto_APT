import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { Link, router } from "expo-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setError("");

    const result = await register(username, email, password);

    if (result.success) {
      router.replace("/auth/login");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 bg-gray-900 p-6 justify-center">
      <Text className="text-3xl font-bold text-white mb-8 text-center">
        Registro
      </Text>

      {error ? (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      ) : null}

      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        placeholder="Nombre de usuario"
        placeholderTextColor="#9CA3AF"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-6"
        placeholder="Contraseña"
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-lg mb-4"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold text-lg">
            Registrarse
          </Text>
        )}
      </TouchableOpacity>

      <Link href="/auth/login" asChild>
        <TouchableOpacity>
          <Text className="text-blue-400 text-center">
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
