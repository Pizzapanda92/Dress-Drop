import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../../../assets/videos/shop-animation0001-0120.mp4")}
        style={styles.video}
        shouldPlay
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  video: { width: "100%", height: "100%" },
});

export default LoadingScreen;
