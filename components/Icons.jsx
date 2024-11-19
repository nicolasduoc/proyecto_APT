import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";

export const HomeIcon = ({ color }) => {
  return <FontAwesome name="home" size={24} color={color} />;
};

export const InfoIcon = ({ color }) => {
  return <FontAwesome name="info-circle" size={24} color={color} />;
};

export const Map = ({ color }) => {
  return <FontAwesome name="map" size={24} color={color} />;
};

export const EarthIcon = ({ color }) => {
  return <FontAwesome6 name="earth-americas" size={24} color={color} />;
};

export const New = ({ color }) => {
  return <Entypo name="new" size={24} color={color} />;
};

export const History = ({ color }) => {
  return <FontAwesome name="history" size={24} color={color} />;
};

export const AlertIcon = ({ color }) => {
  return <FontAwesome name="warning" size={24} color={color} />;
};

export const ContactIcon = ({ color, size }) => (
  <Ionicons name="people-outline" size={size} color={color} />
);
