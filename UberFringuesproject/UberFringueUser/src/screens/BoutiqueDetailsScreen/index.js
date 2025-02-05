import { View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import boutiques from "../../../assets/data/boutiques.json";
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
const boutique = boutiques[0];
const BoutiqueDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params?.id;
  console.warn(id);
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header boutique={boutique} />}
        data={boutique.dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
    </View>
  );
};
export default BoutiqueDetailsPage;



