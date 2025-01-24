import { StyleSheet, FlatList, View } from 'react-native';
import BoutiqueItem from "../../components/BoutiqueItem";
import boutiques from '../../../assets/data/boutiques.json'; // Chemin mis à jour

export default function HomeScreen() {
  return (
    <View style={styles.page}>
    <FlatList
      data={boutiques}
      renderItem={({ item }) => <BoutiqueItem boutiques={item} />}
      showsVerticalScrollIndicator={false}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
});
