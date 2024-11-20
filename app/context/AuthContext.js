/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Intentando login con:", { email });

      const response = await fetch("https://vortexcode.cl/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Status code:", response.status);

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.success) {
        const userData = {
          email,
          userId: data.userId,
        };
        console.log("Usuario autenticado:", userData);

        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        console.log("Error en login:", data.message);
        return {
          success: false,
          error: data.message || "Credenciales inválidas",
        };
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      return {
        success: false,
        error: "Error de conexión. Por favor, intenta de nuevo.",
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch("https://vortexcode.cl/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: data.message || "Error al registrarse",
        };
      }
    } catch (error) {
      return { success: false, error: "Error de conexión" };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
