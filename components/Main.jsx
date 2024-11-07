/* eslint-disable prettier/prettier */
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, StyleSheet } from "react-native";
import icon from "../assets/earthalert.jpg";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Main() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.text}>EARTH ALERT</Text>
      <Text style={styles.text}>¡Alerta de Terremotos!</Text>
      <Text style={styles.text}>¡Alerta de Tsunamis!</Text>
      <Text style={[styles.text,{fontSize: 15}]}>
        !Alerta a tus seres queridos, todo en una sola app{" "}
      </Text>
      <Image
        source={icon}
        style={{ width: 200, height: 200, resizeMode: "contain", }}
      />
      
      <TouchableOpacity

        style={{ backgroundColor: "blue", borderRadius: 25 }}
        onPress={() => alert("Iniciando...")}
      >
        <Text style={{ color: "white" }}>Iniciar!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

});
