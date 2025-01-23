import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import BoutiqueItem from "./src/components/BoutiqueItem";
import boutiques from './assets/data/boutiques.json';

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList data={boutiques} 
      renderItem={({ item }) => <BoutiqueItem boutiques={item} />}
       showsVerticalScrollIndicator={false}
      />


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
    padding: 10,
    paddingVertical: 30,
  },
});
