import { StyleSheet, FlatList, View } from "react-native";
import BoutiqueItem from "../../components/BoutiqueItem";
import boutiques from "../../../assets/data/boutiques.json";
export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={boutiques}
        renderItem={({ item }) => <BoutiqueItem boutique={item} />}
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