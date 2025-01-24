import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import BoutiqueDetailsScreen from './src/screens/BoutiqueDetailsScreen';
import DishDetailsScreen from './src/screens/DishDetailsScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/*<BoutiqueDetailsScreen /> */}
      {/*<HomeScreen />*/}
      <DishDetailsScreen />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center", 
    justifyContent: "center", 
  },
});