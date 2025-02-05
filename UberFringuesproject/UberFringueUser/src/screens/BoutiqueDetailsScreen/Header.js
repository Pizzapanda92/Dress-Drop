import { View, Text, Image } from "react-native";
import styles from "./styles";
const BoutiqueHeader = ({ boutique }) => {
  return (
    <View style={styles.page}>
      <Image source={{ uri: boutique.image }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{boutique.name}</Text>
        <Text style={styles.subtitle}>
          $ {boutique.deliveryFee} &#8226; {boutique.minDeliveryTime}-
          {boutique.maxDeliveryTime} minutes
        </Text>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
};
export default BoutiqueHeader;

